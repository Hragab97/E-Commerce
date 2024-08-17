import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interface/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  allProducts: Product[] = [];

constructor(private _ProductsService:ProductsService){}

getProducts = ()=>{
  this._ProductsService.getProducts().subscribe({
    next: (products) =>{
      console.log(products);
      this.allProducts = products.data
    },
    error: (error) =>{
      console.log(error);
    }
  })
}


ngOnInit(): void {
  this.getProducts();
}


}
