import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { IWish } from '../../core/interface/iwish';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interface/icart';
import { Product } from '../../core/interface/product';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  constructor(
    private _WishListService: WishListService,
    private _TostarService: ToastrService,
    private _Render2: Renderer2,
    private _CartService: CartService
  ) {}

  products: Product[] = [];
  isLoading: boolean = false;
  wishListData: string[] = [];

  ngOnInit(): void {
    this.getWishListUser();
  }

  getWishListUser() {
    this._WishListService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
        this.wishListData = res.data.map((item: any) => item._id)
      },
    });
  }

  addToCart(_id: string): void {
    this._CartService.addProductToCart(_id).subscribe({
      next: (res) => {
        console.log(res)
        this._TostarService.success(res.message, 'Fresh cart')
        this._CartService.cartNumber.next(res.numOfCartItems)
        console.log(this._CartService.cartNumber)
      }, error(err) {
        console.log(err)

      }
    })
  }

  removeFav(productId: string): void {
    this._WishListService.removeItemFromWishList(productId).subscribe({
      next: (response) => {
        this._TostarService.success(response.message);
        this.wishListData = response.data;

        const newProductsData = this.products.filter((item) => this.wishListData.includes(item._id))
        this.products = newProductsData
        this._WishListService.whishItemNumber.next(response.data.length);
      },
      error: (error) => {},
    });
  }
}
