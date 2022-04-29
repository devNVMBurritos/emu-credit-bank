import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgGoogleOneTapModule } from 'ng-google-one-tap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { HomeComponent } from './home/home.component';
import { ConnectionsComponent } from './connections/connections.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CostsComponent } from './costs/costs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    HomeComponent,
    ConnectionsComponent,
    CostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgGoogleOneTapModule.config({
      client_id: '823707024933-s1forcsoj41oi4vfu71n6cpk6fmi0pvj.apps.googleusercontent.com',
      cancel_on_tap_outside: false,
      authvalidate_by_googleapis: false,
      auto_select: false,
      disable_exponential_cooldowntime: false,
      context: 'signup',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
