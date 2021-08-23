import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartIconComponent} from "./cart-icon/cart-icon.component";
import {BadgeModule} from "primeng/badge";
import {CartService} from "@frontend/orders";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {RouterModule, Routes} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";

const routes = [
  {path: 'cart-items', component: CartPageComponent}
]

@NgModule({
  declarations: [CartIconComponent, CartPageComponent],
  imports: [CommonModule, BadgeModule, RouterModule.forChild(routes), ButtonModule, InputNumberModule, FormsModule],
  exports: [CartIconComponent, CartPageComponent],
  providers: [CartService]
})
export class OrdersModule {}
