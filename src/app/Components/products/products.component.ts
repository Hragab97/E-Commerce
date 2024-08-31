import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interface/product';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, SearchPipe, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  allProducts: Product[] = [];
  text:string = ""

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
