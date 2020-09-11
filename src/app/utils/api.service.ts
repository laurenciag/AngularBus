import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../constant/user';
import { Agency } from '../constant/agency';

@Injectable(
    {providedIn: 'root'}
    )
export class ApiService {
    private BASE_URL = 'http://localhost:8080/api';
    user: User;
    agency: Agency;
    constructor(
        private http: HttpClient) {

    }

    postAuth(email, password) {
        var formData: any = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        return this.http.post(`${this.BASE_URL}/login`, formData)
    }

    createAccount(registerRequest){
        return this.http.post(`${this.BASE_URL}/v1/createAccount`, registerRequest);
    }

    getUser(id){
        return this.http.get<User>(`${this.BASE_URL}/v1/getUser?id=${id}`);
    }

    updateUser(id, dataUser){
        return this.http.put<User>(`${this.BASE_URL}/v1/updateUser?id=${id}`, dataUser);
    }

    updatePassword(user){
        return this.http.put<User>(`${this.BASE_URL}/v1/updatePassword`,user);
    }

    getAgency(id){
        return this.http.get<Agency>(`${this.BASE_URL}/v1/getAgency?id=${id}`);
    }

    updateAgency(id, dataAgency){
        return this.http.put<Agency>(`${this.BASE_URL}/v1/updateAgency?id=${id}`, dataAgency);
    }
}