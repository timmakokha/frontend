import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {ProductModel, ProductService} from "@frontend/products";
import {CartService} from "@frontend/orders";


@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: ProductModel = new ProductModel();
  endSubs$: Subject<any> = new Subject();
  quantity: number = 1;

  constructor(private prodService: ProductService, private route: ActivatedRoute, private cartSvc: CartService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productId) {
        this._getProduct(params.productId);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem= {
      productId: this.product.id,
      quantity : this.quantity
    }
    this.cartSvc.addItemToCart(cartItem)
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }
}
