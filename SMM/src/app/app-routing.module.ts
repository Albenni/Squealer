import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VipSelectionComponent } from './pages/vip-selection/vip-selection.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'vipSelection', component: VipSelectionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
