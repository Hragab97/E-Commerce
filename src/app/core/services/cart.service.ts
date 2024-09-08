import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../enviroment/enviroment.local';``

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) {

  }

  cartNumber : BehaviorSubject<number> = new BehaviorSubject(0);

  myHeaders:any = {token: localStorage.getItem('token')};

  addProductToCart = (id: string): Observable<any> => {
 
    return this._HttpClient.post(baseUrl + `api/v1/cart`, {
      "productId": id
    }, {
      headers: this.myHeaders
    })
  }

  getProductsCart = (): Observable<any> => {
 
    return this._HttpClient.get(baseUrl + `api/v1/cart`, {
      headers: this.myHeaders
    })
  }

  deleteSpecificCartItem = (id:string): Observable<any> => {
 
    return this._HttpClient.delete(baseUrl + `api/v1/cart/${id}`, {
      headers: this.myHeaders
    })
  }


 updateSpecificCartItem = (id:string, newCount:number): Observable<any> => {
 
    return this._HttpClient.put(baseUrl + `api/v1/cart/${id}`, {
      "count": newCount
  },  {
    headers: this.myHeaders
  }
)
  }


  clearCart = (): Observable<any> => {
 
    return this._HttpClient.delete(baseUrl + `api/v1/cart`,  {
    headers: this.myHeaders
  }
)
  }


  getLoggedUserCartList(): Observable<any> {
    return this._HttpClient.get(baseUrl + `api/v1/cart`,  {
      headers: this.myHeaders
    });
  }
}
