import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  private readonly _CartService= inject(CartService)
  private readonly _WishListService= inject(WishListService)

  countNumber:number = 0;
  whishItemNumber: number = 0;


  ngOnInit(): void {

    this._CartService.getProductsCart().subscribe({
      next:(res)=> {
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
    })
   this._CartService.cartNumber.subscribe({
    next:(data)=>{
        this.countNumber = data
    }
   })

   this._WishListService.whishItemNumber.subscribe({
    next: (dataNum) => {
      this.whishItemNumber = dataNum;
    }
  })
  this._WishListService.getLoggedUserWishlist().subscribe({
    next: (dataNum) => {
      this.whishItemNumber = dataNum.count;
      console.log(this.whishItemNumber);

    }
  })

  }  

}
