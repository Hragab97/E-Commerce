import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Router } from '@angular/router';


export const isLoggedIn: CanActivateFn = (route, state) => {
    const _Router = inject(Router)
    
    if (typeof localStorage !== 'undefined') {
        if (localStorage.getItem('token') != null) {
            _Router.navigate(['home'])
            return true;
        } else {
            return false;
        }
    }else {
        return false
    }


}