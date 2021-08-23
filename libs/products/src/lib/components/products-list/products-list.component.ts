import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel, CategoryService, ProductModel, ProductService} from "@frontend/products";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'frontend-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: ProductModel[] = []

  categories: CategoryModel[] = []

  endSubs$: Subject<any> = new Subject();
  isCategoryPage  = false;

  constructor(private productSvs: ProductService, private categorySvs: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      console.log(params.categoryId)
      params.categoryId ? this._getProducts([params.categoryId]) : this._getProducts();
      params.categoryId ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories()
  }

  private _getProducts(p?: any[]){
    this.productSvs.getProducts().pipe(takeUntil(this.endSubs$)).subscribe(data => {
      this.products = data
    })
  }

  private _getCategories(){
    this.categorySvs.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(data => {
      this.categories = data
    }, error => console.log(error.message))
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  categoryFilter() {

    let selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id) || [];

    this._getProducts(selectedCategories);
  }
}
