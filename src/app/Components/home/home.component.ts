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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, FormsModule, CategoriesSliderComponent, RouterLink, UpperCasePipe, CurrencyPipe, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly _CartService = inject(CartService)

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
      }, error(err) {
        console.log(err)
      }
    })
  }

}
