import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  allOrders: any[] = [];

  private readonly _OrdersService = inject(OrdersService)

ngOnInit():void{
  this._OrdersService.getUserOrders().subscribe({
    next:(res)=>{
         console.log(res)
         this.allOrders = res
    }, error(err) {
      console.log(err)
    },
  })
  

  
}


getUserOrders():void{


}

}
