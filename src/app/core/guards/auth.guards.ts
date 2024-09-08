import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
    const _Router = inject(Router)

    if (typeof localStorage !== "undefined") {

        if (localStorage.getItem('token')) {
            return true;
        } else {
            _Router.navigate(['signin'])
            return false;
        }
    } else {
        return false
    }
}