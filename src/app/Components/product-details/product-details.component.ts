import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interface/product';

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
  

  ngOnInit(): void {

let id: string | null= ""

    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'))
        id = param.get('id')
      }
    })

// console.log(this._ActivatedRoute.snapshot.params['id'])


this._ProductService.getProduct(id).subscribe({
  next:(res)=>{
     console.log(res.data)
     this.productDetails = res.data
  } 
})

  }

}
