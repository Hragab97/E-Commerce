import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interface/product';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, SearchPipe, CurrencyPipe, RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly _CartService = inject(CartService)
  private readonly _ToastrService= inject(ToastrService)
  private readonly _WishListService= inject(WishListService)


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



addToCart(_id: string): void {
  this._CartService.addProductToCart(_id).subscribe({
    next: (res) => {
      console.log(res)
      this._ToastrService.success(res.message, 'Fresh cart')
    }, error(err) {
      console.log(err)
      
    }
  })
}


addToWishList(_id: string):void{

  this._WishListService.addProductToWishlist(_id).subscribe({
    next:(res)=>{
       console.log(res)
       this._ToastrService.success("Product added successfully to your Wishlist", 'Fresh cart')
      }, error(err) {
      console.log(err)
    },
  })
  
    }
  


    

}
