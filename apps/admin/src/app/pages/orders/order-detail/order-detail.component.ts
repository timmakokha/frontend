import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../../../../../../libs/products/src/lib/services/category.service";
import {CategoryModel} from "../../../../../../../libs/products/src/lib/models/categoryModel";
import {MessageService} from "primeng/api";
import {ConfirmationService} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersService} from "@frontend/orders";
import {ORDER_STATUS} from "../order.constants";
import {Subject, timer} from "rxjs";
import {Location} from "@angular/common";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'frontend-category-list',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  categories: CategoryModel[] = []
  order: any;
  orderStatuses:{ name: string; id: string }[] = [];
  selectedStatus: any;
  endsubs$: Subject<any> = new Subject<any>();
  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location
  ) { }



  ngOnInit(): void {
    this._mapOrderStatus()
    this._getOrder()
  }

  ngOnDestroy(): void {
    this.endsubs$.complete()
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrder(params.id).pipe(takeUntil(this.endsubs$)).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
    console.log(this.orderStatuses[3])
  }

  onStatusChange(event: any) {
    this.orderService.updateOrder({status: this.selectedStatus}, this.order.id).pipe(takeUntil(this.endsubs$)).subscribe(data => {
      this.messageService.add({severity:"success", summary:"Update successful", detail: ""})
      timer(2000).toPromise().then(done => {
        this.location.back()
      })
    }, error => {
      this.messageService.add({severity:"warning", summary:"Update not successful", detail: error.message})
    })
  }


}
