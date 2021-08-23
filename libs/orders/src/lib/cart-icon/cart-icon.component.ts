import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";

@Component({
  selector: 'cart-icon-component',
  templateUrl: 'cart-icon-component.html'
})

export class CartIconComponent implements OnInit {
  cartItems : any =0
  constructor(private cartSvs: CartService) {
  }


  ngOnInit() {
    this.cartSvs.cart$.subscribe(cart => {
      this.cartItems = cart.items?.length
    })
  }
}
