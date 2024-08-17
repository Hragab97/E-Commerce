import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interface/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

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
