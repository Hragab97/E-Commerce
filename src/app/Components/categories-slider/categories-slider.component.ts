import { Component, inject } from '@angular/core';
import { CategorysService } from '../../core/services/categorys.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss'
})
export class CategoriesSliderComponent {

  categories: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplaySpeed:2000,
    autoplayTimeout:500,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  private readonly _CategoriesService = inject(CategorysService)

  ngOnInit(): void {

    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res)
        this.categories = res.data
      }
    })

  }

}
