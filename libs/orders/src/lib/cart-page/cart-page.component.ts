import {Component, OnInit} from '@angular/core';
import {ProductService} from "@frontend/products";

@Component({
  selector: 'cart-page-component',
  templateUrl: 'cart-page-component.html'
})

export class CartPageComponent implements OnInit {
  cartCount: any = 3;
  cartItemsDetailed: any;
  constructor() {
  }

  ngOnInit() {
  }

  backToShop() {

  }

  deleteCartItem() {

  }

  updateCartItemQuantity($event: any, cartItem: any) {

  }
}
