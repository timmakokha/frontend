import { Component, OnInit } from '@angular/core';
import {CartService} from "@frontend/orders";

@Component({
  selector: 'frontend-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private cartSvs: CartService) { }

  ngOnInit(): void {
    this.cartSvs.initialCart()
  }

}
