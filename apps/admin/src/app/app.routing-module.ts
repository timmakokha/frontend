import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShellComponent} from "./shared/shell/shell.component";
import {AuthGuardService} from "@frontend/users";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {CategoryListComponent} from "./pages/category/category-list/category-list.component";
import {ProductListComponent} from "./pages/products/product-list/product-list.component";
import {OrderListComponent} from "./pages/orders/order-list/order-list.component";
import {OrderDetailComponent} from "./pages/orders/order-detail/order-detail.component";
import {ProductFormComponent} from "./pages/products/product-form/product-form.component";
import {CategoryAddComponent} from "./pages/category/category-add/category-add.component";
import {UsersListComponent} from "./pages/users/users-list/users-list.component";
import {UserFormComponent} from "./pages/users/user-form/user-form.component";

const routes: Routes = [
  {path: "", component: ShellComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: "", component: DashboardComponent},
      {path: "category", component: CategoryListComponent},
      {path: "products", component: ProductListComponent},
      {path: "orders", component: OrderListComponent},
      {path: "orders/:id", component: OrderDetailComponent},
      {path: "products/form", component: ProductFormComponent},
      {path: "products/form/:id", component: ProductFormComponent},
      {path: "category/form", component: CategoryAddComponent},
      {path: "category/form/:id", component: CategoryAddComponent},
      {path: "users", component: UsersListComponent},
      {path: "users/form", component: UserFormComponent},
      {path: "users/form/:id", component: UserFormComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),],
  exports: [RouterModule],
  declarations: [],
})
export class appRoutingModule {
}
