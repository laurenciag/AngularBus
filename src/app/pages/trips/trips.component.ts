import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BASE_URL } from '../../constant/base-url'
import { AuthService } from 'src/app/utils/auth.service';
import * as $ from 'jquery';
import '@progress/kendo-ui';

declare var $: any 

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  agencyId;
  @ViewChild('grid') gridEl;
  record = 0
  constructor(private authService: AuthService) { 
    this.agencyId = this.authService.decodeJWT().agencyId;
  }

  ngOnInit(): void {
    
    // console.log(this.agencyId)
  }

  public ngAfterViewInit() {

    // instantiate a Grid from the actual DOM element, wrapped in a jQuery object
    let dataSources = new kendo.data.DataSource({
      transport: {
        read: {
          url: BASE_URL + "/v1/getAllTrip?agencyId=" + this.agencyId,
          dataType: "json",
          type: "GET",
          contentType: "application/json"
        },
        update: {
          url: BASE_URL + "/v1/updateTrip",
          dataType: "json",
          type: "PUT",
          contentType: "application/json"
        },
        destroy: {
          url: BASE_URL + "/v1/deleteTrip",
          dataType: "json",
          type: "POST",
          contentType: "application/json"
        },
        create: {
          url: BASE_URL + "/v1/addTrip?agencyId=" + this.agencyId,
          dataType: "json",
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function (options, operation) {
          if (operation !== "read" && options.models) {
            return kendo.stringify(options.models);
          }
        }
      },
      batch: true,
      pageSize: 10,
      schema: {
        model: {
          id: "id",
          fields: {
            id: { editable: false, nullable: true },
            bus: { validation: { required: true }, defaultValue: { id: '', code: '' } },
            sourceStop: { validation: { required: true }, defaultValue: { id: '', name: '' } },
            destStop: { validation: { required: true }, defaultValue: { id: '', name: '' } },
            fare: { type: "number", validation: { required: true, min: 0 } },
            journeyDate: { type: "number", validation: { required: true, min: 0 } },
          }
        }
      },
      sort: {
        field: "code",
        dir: "asc"
      }
    });

    $(this.gridEl.nativeElement).kendoGrid({
      dataSource: dataSources,
      navigatable: true,
      height: 400,
      filterable: true,
      sortable: true,
      pageable: {
        alwaysVisible: true,
        pageSizes: [5, 10, 20, 100]
      },
      toolbar: ["create", "save", "cancel"],
      columns: [
        // {
        //   title: "#",
        //   template: "#=++record #",
        //   attributes: {
        //     style: "text-align: center;"
        //   },
        //   headerAttributes: {
        //     style: "text-align: center;"
        //   },
        //   width: 50
        // },
        {
          field: "bus",
          width: 200,
          title: "Bus Code",
          template: "#=bus.code#",
          editor: this.busCodeDropDownEditor
        },
        {
          field: "sourceStop",
          title: "Source Stop",
          // format: "{0:c}",
          width: 150,
          template: "#=sourceStop.name#",
          editor: this.stopDropDownEditor
        },
        {
          field: "destStop",
          title: "Destination Stop",
          width: 150,
          template: "#=destStop.name#",
          editor: this.stopDropDownEditor
        },
        {
          field: "journeyDate",
          title: "Duration",
          width: 150,
          attributes: {
            style: "text-align: center;"
          },
          headerAttributes: {
            style: "text-align: center;"
          }
        },
        {
          field: "fare",
          title: "Fare",
          width: 150,
          format: "{0:c}",
          attributes: {
            style: "text-align: center;"
          },
          headerAttributes: {
            style: "text-align: center;"
          }
        },
        {
          command: "destroy",
          title: "Action",
          width: 150,
          filterable: false,
          attributes: {
            style: "text-align: center;"
          },
          headerAttributes: {
            style: "text-align: center;"
          }
        }
      ],
      editable: true
    });
  }

  busCodeDropDownEditor(container, options) {
    // let id = this.authService.decodeJWT().agencyId;
    let token = JSON.parse(atob(localStorage.getItem("LoggedInUser").split(".")[1]))
    console.log(token)
    $('<input required name="' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        dataTextField: "code",
        dataValueField: "id",
        dataSource: {
          transport: {
            read: {
              url: BASE_URL + "/v1/getAllBus?agencyId="+token.agencyId,
              dataType: "json",
              type: "GET",
              contentType: "application/json"
            }
          }
        }
      });
  }
  
  
  stopDropDownEditor(container, options) {
    $('<input required name="' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        dataTextField: "name",
        dataValueField: "id",
        dataSource: {
          transport: {
            read: {
              url: BASE_URL+"/v1/getAllStop",
              dataType: "json",
              type: "GET",
              contentType: "application/json"
            }
          }
        }
      });
  }

}