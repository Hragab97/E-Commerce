import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../core/services/categorys.service';
import { Categories } from '../../core/interface/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{


allCategories: Categories[]= []

  constructor(private _CategorysService:CategorysService){}

  getCategories = ()=>{
    this._CategorysService.getCategories().subscribe({
      next:(categories) =>{
        console.log(categories.data);
        this.allCategories = categories.data
      },
      error(error) {
        console.log(error);
      },
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
