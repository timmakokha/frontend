import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryModel} from "../models/categoryModel";
import {Observable} from "rxjs";

import {environment} from "@env/environment"


const apiUrl = environment.appUrl+'/categories'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  constructor(private httpClient: HttpClient) { }

  getCategories() : Observable<CategoryModel[]>{
   return  this.httpClient.get<CategoryModel[]>(apiUrl);
  }

  createCategory(payload: CategoryModel) :Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(`${apiUrl}`, payload)
  }

  deleteCategory(categoryId: string) : Observable<string>{
    return this.httpClient.delete<string>(`${apiUrl}/${categoryId}`)
  }
  getById(categoryId: string) : Observable<CategoryModel>{
    return this.httpClient.get<CategoryModel>(`${apiUrl}/${categoryId}`)
  }

  updateById(categoryId: string, payload: CategoryModel) : Observable<string>{
    return this.httpClient.put<string>(`${apiUrl}/${categoryId}`, payload)
  }

}
