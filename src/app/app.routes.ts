import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout/auth-layout.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { authGuard } from './core/guards/auth.guards';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

export const routes: Routes = [
    {
        path: "", title: "Authentication", component: AuthLayoutComponent,
        children: [
            {path:"",redirectTo:"signin",pathMatch:"full"},
            { path: "signin", title: "SignIn", component: SigninComponent },
            { path: "signup", title: "SignUp", component: SignupComponent },
            { path: "forgotPassword", title: "Forgot Password", component: ForgotPasswordComponent }
        ]
    },
    { path: "", title: "main", component:MainLayoutComponent, canActivate:[authGuard] , children:[
        {path:"",redirectTo:"home",pathMatch:"full"},
        {path:"home",title:"Home",component:HomeComponent },
        {path:"products",title:"Products",component:ProductsComponent},
        {path:"categories",title:"Categories",component:CategoriesComponent},
        {path:"brands",title:"Brands",component:BrandsComponent},
        {path:"cart",title:"Cart",component:CartComponent},
        {path:"wishlist",title:"Orders",component:OrdersComponent},
        {path:"details/:id",title:"Details",component:ProductDetailsComponent},
    ]},
    {path:'**',title:"404",component:NotFoundComponent}
];
