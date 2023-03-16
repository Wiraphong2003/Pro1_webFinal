import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';
import { AdminComponent } from './page/admin/admin.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'cart', component: ShoppingCartComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
