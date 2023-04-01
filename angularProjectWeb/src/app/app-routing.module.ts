import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';
import { AdminComponent } from './page/admin/admin.component';
import { LoginComponent } from './page/login/login.component';
import { OrderAdminComponent } from './page/order-admin/order-admin.component';
import { ListcustomerComponent } from './page/listcustomer/listcustomer.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'main', component: MainComponent },
  { path: 'orderadmin', component: OrderAdminComponent },
  { path: 'listcustomer', component: ListcustomerComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
