import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionsComponent } from './connections/connections.component';
import { CostsComponent } from './costs/costs.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'connection', component: ConnectionsComponent, canActivate: [AuthGuard] },
  { path: 'costs', component: CostsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
