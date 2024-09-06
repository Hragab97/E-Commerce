import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interface/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {


  private readonly _CartService = inject(CartService);
  private readonly _ToastrService= inject(ToastrService)

  cartDetails: ICart = {} as ICart

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res.data)
        this.cartDetails = res.data
      }, error(err) {
        console.log(err)
      },
    })
  }

  removeItem(id: string): void {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails = res.data
        this._ToastrService.error("Product removed", 'Fresh Cart')
        this._CartService.cartNumber.next(res.numOfCartItems)
      }, error(err) {
        console.log(err)
      },
    })
  }

  updateCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateSpecificCartItem(id, count).subscribe({
        next: (res) => {
          console.log(res)
          this._ToastrService.info("Product updated successfully", 'Fresh Cart')
          this.cartDetails = res.data
        }, error(err) {
          console.log(err)
        },
      })
    }
  }


clearCart():void{
  this._CartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res)
      if (res.message == "success") {
        this.cartDetails = {} as ICart
        this._ToastrService.error("All products are removed", 'Fresh Cart')
        this._CartService.cartNumber.next(0)


      }
    },error(err) {
      console.log(err)
    },
  })
}

}
