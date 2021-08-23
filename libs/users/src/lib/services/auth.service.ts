import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {UserModel} from "../models/userModel";
import {LocalStorageService} from "./localStorage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.appUrl + '/users';

  constructor(
    private http: HttpClient,
    private token: LocalStorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiURLUsers}/login`, { email, password });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
