import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
