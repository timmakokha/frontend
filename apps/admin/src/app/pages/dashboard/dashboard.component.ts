import { Component, OnInit } from '@angular/core';
import {UsersService} from "@frontend/users";
import {ProductService} from "@frontend/products";
import {OrdersService} from "@frontend/orders";
import {combineLatest, Observable, ObservedValueOf} from "rxjs";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";

@Component({
  selector: 'frontend-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  ordersCount: any = ''
  productsCount: any = ''
  salesCount: any = ''
  usersCount: any = ''
  data:any
  constructor(
    private userService: UsersService,
    private productService: ProductService,
    private ordersService: OrdersService
  ) {

  }

  update(event: Event){}

  ngOnInit(): void {

      this.ordersService.getOrdersCount().subscribe(data => {
        this.ordersCount = data.orderCount
      }),
      this.productService.getProductsCount().subscribe(data => {
        this.productsCount = data.productCount

      }),
      this.userService.getUsersCount().subscribe(data => {
        this.usersCount = data.userCount
      })
      // this.ordersService.getSaleSCount().subscribe(data => {
      //   this.salesCount = data.totalSale
      // })
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
  }

  selectData(event: Event) {
     return this.data.datasets
    //event.element = Selected element
    //event.element._datasetIndex = Index of the dataset in data
    //event.element._index = Index of the data in dataset
  }

}
