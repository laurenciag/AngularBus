import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../constant/user';

@Injectable ({
    providedIn: 'root'
})

export class UserService {
    private BASE_URL = 'https://localhost:8080/api';
    constructor (
        private http: HttpClient){}
        private id: string

        getUser(){
            return this.http.get<User>(`${this.BASE_URL}/createAccount`);
        }

    }