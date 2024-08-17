import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brands } from '../../core/interface/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  allBrands: Brands[] = [];

  constructor(private _BrandsService: BrandsService) { }

  getBrands = () => {
    this._BrandsService.getBrands().subscribe({
      next: (brands) => {
        console.log(brands.data);
        this.allBrands = brands.data

      },
      error(error) {
        console.log(error);
      },
    })
  }

  ngOnInit(): void {
    this.getBrands();
  }

}
