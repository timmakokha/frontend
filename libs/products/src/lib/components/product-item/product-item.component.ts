import {Component, Input, OnInit} from '@angular/core';
import {CartItem, CartService} from "@frontend/orders";

@Component({
  selector: 'product-item-component',
  templateUrl: 'product-item-component.html'
})

export class ProductItemComponent implements OnInit {

  @Input() product: any;

  constructor(private cartSvs: CartService) {}

  ngOnInit(): void {}


  addToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartSvs.addItemToCart(cartItem)
  }
}
