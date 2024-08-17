import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorysService {

  constructor(private _HttpClient: HttpClient) { }


  getCategories = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + `api/v1/categories`)
  }

}
