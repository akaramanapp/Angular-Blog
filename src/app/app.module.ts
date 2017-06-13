import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './shared/app.routing';
import { AdminModule } from './admin/admin.module';
import { UserService } from './admin/adminShared/user.service';
import { BlogAdminComponent } from './admin/blogAdmin/blog-admin.component';
import { BlogAddComponent } from './admin/blogAdd/blog-add.component';

@NgModule({

  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ErrorComponent,
    BlogAdminComponent,
    BlogAddComponent
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
