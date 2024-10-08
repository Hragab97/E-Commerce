import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }

  myHeaders:any = {token: localStorage.getItem('token')};

  checkOut = (idCart:string | null, shippingDetails:object): Observable<any> => {
 
    return this._HttpClient.post(`${baseUrl}api/v1/orders/checkout-session/${idCart}?url=http://localhost:4200`, 

      {
        "shippingAddress":shippingDetails
    }, {
      headers: this.myHeaders
    }

    
)
  }

  getAllOrders = (): Observable<any> => {
 
    return this._HttpClient.get(`${baseUrl}api/v1/orders/`, 
{
      headers: this.myHeaders
    }
)
  }


  getUserOrders = (): Observable<any> => {
 
    return this._HttpClient.get(`${baseUrl}api/v1/orders/user/66a621bced0dc0016cd567ff`, 
{
      headers: this.myHeaders
    }
)
  }


}
