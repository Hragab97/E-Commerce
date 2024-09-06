import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { IWish } from '../../core/interface/iwish';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interface/icart';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {

  private readonly _WishListService=inject(WishListService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _CartService=inject(CartService)

  wishListDetails: ICart = {} as ICart

  ngOnInit(): void {
    this._WishListService.getProductsWishlist().subscribe({
      next: (res) => {
        console.log(res.data)
        this.wishListDetails = res.data
      }, error(err) {
        console.log(err)
      },
    })
  }

  removeItem(id: string): void {
    this._WishListService.deleteSpecificWishlistItem(id).subscribe({
      next: (res) => {
        console.log(res)
        this.wishListDetails = res.data
        this._ToastrService.error("Product removed", 'Fresh Cart')
      }, error(err) {
        console.log(err)
      },
    })
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
