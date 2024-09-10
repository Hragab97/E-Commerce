import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interface/product';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

productDetails!:Product;

  private readonly _ProductService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  

  ngOnInit(): void {

let id: string | null= ""

    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'))
        id = param.get('id')
      }
    })



this._ProductService.getProduct(id).subscribe({
  next:(res)=>{
     console.log(res.data)
     this.productDetails = res.data
  } 
})
  }


  addToCart(_id: string): void {
    this._CartService.addProductToCart(_id).subscribe({
      next: (res) => {
        console.log(res)
        this._ToastrService.success(res.message, 'Fresh cart')
        this._CartService.cartNumber.next(res.numOfCartItems)
        console.log(this._CartService.cartNumber)
      }, error(err) {
        console.log(err)

      }
    })
  }


}
