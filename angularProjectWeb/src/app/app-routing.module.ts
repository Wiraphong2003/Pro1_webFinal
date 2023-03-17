import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';
import { AdminComponent } from './page/admin/admin.component';
import { LoginComponent } from './page/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent  },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'main', component: MainComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
