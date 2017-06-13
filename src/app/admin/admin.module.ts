import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from "app/admin/adminShared/user.service";
import { BlogAdminService } from "app/admin/adminShared/blog-admin.service";
import { BlogAdminComponent } from './blogAdmin/blog-admin.component';
import { BlogAddComponent } from './blogAdd/blog-add.component';
import { TruncatePipe } from './../trunc.pipe'
import { ProductService } from "app/admin/adminShared/product-admin.service";





const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'blog-admin', component: BlogAdminComponent, canActivate: [UserService] },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: '', component: AdminMenuComponent, canActivate: [UserService] }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AdminRoutes)

    ],
    exports: [
        RouterModule,
        TruncatePipe
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        LoginComponent,
        SignUpComponent,
        TruncatePipe
    ],
    providers: [
        UserService,
        BlogAdminService,
        ProductService
    ]
})
export class AdminModule { }