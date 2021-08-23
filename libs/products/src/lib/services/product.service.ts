import {Injectable} from "@angular/core";
import {environment} from "@env/environment"
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductModel} from "../models/productModel";

const apiUrl = environment.appUrl+'/products'
@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http: HttpClient) {}

  getProducts(categoriesFilter?: string[]): Observable<ProductModel[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<ProductModel[]>(apiUrl, { params: params });
  }

  getProduct(id: string) : Observable<ProductModel> {
    return this.http.get<ProductModel>(`${apiUrl}/${id}`)
  }

  updateProduct(productData: FormData, productid: string) : Observable<ProductModel> {
    return this.http.put<ProductModel>(`${apiUrl}/${productid}`, productData);
  }

  createProduct(productData: FormData) : Observable<ProductModel> {
    return this.http.post<ProductModel>(apiUrl, productData)
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/${productId}`);
  }

  getProductsCount(): Observable<any>{
    return this.http.get<any>(`${apiUrl}/count/products`)
  }

  getFeaturedProducts(count : number): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(`${apiUrl}/get/featured/${count}`)
  }
}
