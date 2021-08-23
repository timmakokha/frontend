import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {SearchComponent} from "./components/search/search.component";
import { RouterModule} from "@angular/router";
import {OrdersModule} from "../../../orders/src/lib/orders.module";
import {ButtonModule} from "primeng/button";
import {CategoriesBannerComponent} from "./components/categories-banner/categories-banner.component";
import {ProductItemComponent} from "./components/product-item/product-item.component";
import {FeaturedProductComponent} from "./components/featured-product/featured-product.component";
import {ProductsListComponent} from "./components/products-list/products-list.component";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {ProductPageComponent} from "./components/product-page/product-page.component";
import {RatingModule} from "primeng/rating";
import {InputNumberModule} from "primeng/inputnumber";
import {UiModule} from "@frontend/ui";


const route = [
  {path: "products", component: ProductsListComponent},
  {path: "category/:categoryId", component: ProductsListComponent},
  {path: "products/:productId", component: ProductPageComponent}
]

@NgModule({
  declarations: [SearchComponent, CategoriesBannerComponent,FeaturedProductComponent, ProductItemComponent, ProductsListComponent, ProductPageComponent],
  imports: [
    CommonModule,
    OrdersModule,
    UiModule,
    RouterModule.forChild(route),
    ButtonModule,
    HttpClientModule,
    CheckboxModule,
    FormsModule,
    FormsModule,
    RatingModule,
    InputNumberModule

  ],
  exports: [SearchComponent, CategoriesBannerComponent ,FeaturedProductComponent,ProductItemComponent,ProductsListComponent, ProductPageComponent],

})
export class ProductsModule { }
