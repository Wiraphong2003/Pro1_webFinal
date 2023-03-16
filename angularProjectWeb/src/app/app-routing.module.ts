import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cart', component: ShoppingCartComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }