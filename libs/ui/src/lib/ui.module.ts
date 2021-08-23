import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { BannerComponent } from './banner/banner.component';
import {ButtonModule} from "primeng/button";
import {GalaryComponent} from "./galary/galary-component";



@NgModule({
  declarations: [
    SliderComponent,
    BannerComponent, GalaryComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    SliderComponent,
    BannerComponent, GalaryComponent
  ]
})
export class UiModule { }
