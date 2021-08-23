import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../../../../../../libs/products/src/lib/services/category.service";
import {CategoryModel} from "../../../../../../../libs/products/src/lib/models/categoryModel";
import {MessageService} from "primeng/api";
import {ConfirmationService} from 'primeng/api';
import {Router} from "@angular/router";
import {Order, OrdersService} from "@frontend/orders";
import {ORDER_STATUS} from "../order.constants";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'frontend-category-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<any> = new Subject<any>();
  constructor(private orderSvs: OrdersService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }



  ngOnInit(): void {
    this.showCategories()
  }

  ngOnDestroy(): void {
    this.endsubs$.complete()
  }

  showCategories(){
    this.orderSvs.getOrders().pipe(takeUntil(this.endsubs$)).subscribe(data => {
      this.orders = data
    })
  }

  deleteOrder(orderId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.orderSvs.deleteOrder(orderId).pipe(takeUntil(this.endsubs$)).subscribe(response => {
          this.showCategories()
          this.messageService.add({severity:"success", summary:"Deletion successful", detail: ""})
        }, error => {
          this.messageService.add({severity:"success", summary:"Deletion successful", detail: error.message})
        })
      }
    });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }


}
