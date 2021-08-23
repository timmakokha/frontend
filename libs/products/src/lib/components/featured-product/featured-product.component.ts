import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModel} from "../../models/productModel";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'featured-product-component',
  templateUrl: 'featured-product-component.html'
})

export class FeaturedProductComponent implements OnInit, OnDestroy {
  constructor(private productSvs: ProductService) {
  }

  featuredProducts: ProductModel[] = []
  count: number = 6

  endSubs$: Subject<any> = new Subject();

  ngOnInit() {
    this._getFeaturedProducts(this.count)
  }

  private _getFeaturedProducts(countNo: number) {
    this.productSvs.getFeaturedProducts(countNo).pipe(takeUntil(this.endSubs$)).subscribe(data => {
        this.featuredProducts = data
    }, error => console.log(error.message))
  }


  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
