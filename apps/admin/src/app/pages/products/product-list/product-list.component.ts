import { Component, OnInit } from '@angular/core';
import {ProductModel, ProductService} from "@frontend/products";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'frontend-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: ProductModel[] =[]

  constructor(private productSvs: ProductService,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this._getProducts()
  }

  endsubs$: Subject<any> = new Subject<any>();
  ngOnDestroy(): void {
    this.endsubs$.complete()
  }

  private _getProducts(){
    this.productSvs.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products => {
      this.products = products
    })
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.productSvs.deleteProduct(productId).pipe(takeUntil(this.endsubs$)).subscribe(response => {
          this._getProducts()
          this.messageService.add({severity:"success", summary:"Deletion successful", detail: ""})
        }, error => {
          this.messageService.add({severity:"success", summary:"Deletion successful", detail: error.message})
        })
      }
    });
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }
}
