import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interface/product';
import { AuthService } from '../../core/services/auth.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesSliderComponent } from '../categories-slider/categories-slider.component';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, FormsModule, CategoriesSliderComponent, RouterLink, UpperCasePipe, CurrencyPipe, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly _CartService = inject(CartService)
  private readonly _WishListService = inject(WishListService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  allProducts: Product[] = [];
  text: string = ""

  customOptionsMain: OwlOptions = {

    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayTimeout: 2500,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  constructor(private _ProductsService: ProductsService, private _token: AuthService) {
    this._token.saveUserData()
  }

  getProducts = () => {
    this._ProductsService.getProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.allProducts = products.data

      },
      error: (error) => {
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
        this._CartService.cartNumber.next(res.numOfCartItems)
        console.log(this._CartService.cartNumber)
      }, error(err) {
        console.log(err)

      }
    })
  }

  addToWishList(_id: string): void {

    this._WishListService.addProductToWishlist(_id).subscribe({
      next: (res) => {
        console.log(res)
        this._ToastrService.success("Product added successfully to your Wishlist", 'Fresh cart')
        this._CartService.cartNumber.next(res.numOfCartItems)
      }, error(err) {
        console.log(err)
      },
    })

  }

}
