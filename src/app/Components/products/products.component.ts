import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interface/product';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, SearchPipe, CurrencyPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly _CartService = inject(CartService)
  private readonly _ToastrService= inject(ToastrService)

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

}
