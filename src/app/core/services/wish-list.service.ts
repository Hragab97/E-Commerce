import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../enviroment/enviroment.local';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient: HttpClient) { }


  myHeaders:any = {token: localStorage.getItem('token')};


  addProductToWishlist = (id: string): Observable<any> => {
 
    return this._HttpClient.post(baseUrl + `api/v1/wishlist`, {
      "productId": id
    }, {
      headers: this.myHeaders
    })
  }

  getProductsWishlist = (): Observable<any> => {
 
    return this._HttpClient.get(baseUrl + `api/v1/wishlist`, {
      headers: this.myHeaders
    })
  }

  deleteSpecificWishlistItem = (id:string): Observable<any> => {
 
    return this._HttpClient.delete(baseUrl + `api/v1/wishlist/${id}`, {
      headers: this.myHeaders
    })
  }

}
