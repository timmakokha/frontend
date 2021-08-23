import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule} from "@angular/router";
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import {UiModule} from "../../../../libs/ui/src/lib/ui.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavComponent} from "./shared/nav/nav.component";

import {ButtonModule} from "primeng/button";
import {ProductsModule} from "../../../../libs/products/src/lib/products.module";
import {CartService} from "@frontend/orders";
import {OrdersModule} from "../../../../libs/orders/src/lib/orders.module";



const route = [
  {path: "", component: HomePageComponent},
  ];

@NgModule({
  declarations: [AppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route),
    ProductsModule,
    OrdersModule,
    UiModule,
    ButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
