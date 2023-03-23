import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';
import { AdminComponent } from './page/admin/admin.component';
import { LoginComponent } from './page/login/login.component';


const routes: Routes = [
<<<<<<< HEAD
  { path: '', component: LoginComponent },
=======
  { path: '', component: LoginComponent  },
>>>>>>> 61220f61e8b5c6cf0e2b585d1b81ead67938dbaf
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'main', component: MainComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
