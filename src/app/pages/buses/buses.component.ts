import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BASE_URL } from '../../constant/base-url'
import { AuthService } from 'src/app/utils/auth.service';
import * as $ from 'jquery';
import '@progress/kendo-ui';

window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {

  @ViewChild('grid') gridEl;
  agencyId: string;
  record = 0
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.agencyId = this.authService.decodeJWT().agencyId;
    // console.log(this.agencyId)
  }

  public ngAfterViewInit() {

    // instantiate a Grid from the actual DOM element, wrapped in a jQuery object
    let dataSources = new kendo.data.DataSource({
      transport: {
        read: {
          url: BASE_URL+"/v1/getAllBus?agencyId="+this.agencyId,
          dataType: "json",
          type: "GET",
          contentType: "application/json"
        },
        update: {
          url: BASE_URL+"/v1/updateBus",
          dataType: "json",
          type: "PUT",
          contentType: "application/json"
        },
        destroy: {
          url: BASE_URL+"/v1/deleteBus",
          dataType: "json",
          type: "POST",
          contentType: "application/json"
        },
        create: {
          url: BASE_URL+"/v1/addBus?agencyId="+this.agencyId,
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
            code: { validation: { required: true } },
            capacity: { type: "number", validation: { required: true, min: 0 } },
            make: { type: "string", validation: { required: true } },
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
          field: "code",
          width: 200,
          title: "Bus Code"
        },
        {
          field: "capacity",
          title: "Capacity",
          // format: "{0:c}",
          width: 150,
          attributes: {
            style: "text-align: center;"
          },
          headerAttributes: {
            style: "text-align: center;"
          }
        },
        {
          field: "make",
          title: "Model",
          width: 150,
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
}
