import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'galary-component',
  templateUrl: 'galary-component.html'
})

export class GalaryComponent implements OnInit {

  @Input() photos?: string[] | any;
  selectedImageUrl: string = '';
  constructor() {
  }

  ngOnInit(): void {
    if (this.hasImages) {
      console.log(this.hasImages)
      this.selectedImageUrl = this.photos[0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages() {
    return this.photos?.length > 0;
  }
}
