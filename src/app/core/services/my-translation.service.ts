import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslationService {

  constructor(private _TranslateService: TranslateService) { 
    const savedLang = localStorage.getItem('lang') || 'en'

    this._TranslateService.setDefaultLang(savedLang)
    this._TranslateService.use(savedLang)
  }
}
