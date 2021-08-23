import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "@env/environment"
import {UserModel} from "../models/userModel";


const apiUrl = environment.appUrl+'/users'


@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private httpClient: HttpClient) { }

  getUsers() : Observable<UserModel[]>{
    return  this.httpClient.get<UserModel[]>(apiUrl);
  }

  createUser(payload: UserModel) :Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${apiUrl}`, payload)
  }

  deleteUser(categoryId: string) : Observable<string>{
    return this.httpClient.delete<string>(`${apiUrl}/${categoryId}`)
  }
  getUserById(categoryId: string) : Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${apiUrl}/${categoryId}`)
  }

  updateUser(userId: string, payload: UserModel) : Observable<string>{
    return this.httpClient.put<string>(`${apiUrl}/${userId}`, payload)
  }

  getUsersCount() : Observable<any>{
    return this.httpClient.get<any>(`${apiUrl}/get/count`)
  }


}
