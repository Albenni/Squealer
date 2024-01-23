import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { VipSelectPageComponent } from './pages/vip-select-page/vip-select-page.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'vipSelect', component: VipSelectPageComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
