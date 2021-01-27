import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AccountComponent } from './account/account.component';
import { TransactionComponent } from './account/transaction/transaction.component';
import { UserlistComponent } from './account/userlist/userlist.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserserviceService } from './account/userservice.service';
import { AdminComponent } from './account/admin/admin.component';
import { NormaluserComponent } from './account/normaluser/normaluser.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { TransactionserviceService } from './account/transactionservice.service';
import { CurrentuserService } from './currentuser.service';
import { TransactioinsComponent } from './transactioins/transactioins.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';

const appRoutes : Routes =[
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'**',component:HomeComponent}, 
  {path:'login',component:LoginComponent},
  {path:'home/login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home/register',component:RegisterComponent},
  {path:'about',component:AboutComponent},
  {path:'home/about',component:AboutComponent},
  {path:'contactus',component:ContactUsComponent},
  {path:'home/contactus',component:ContactUsComponent},
  {path:'normaluser',component:NormaluserComponent},
  {path:'admin',component:AdminComponent},
  {path:'normaluser/transaction',component:TransactionComponent},
  {path:'admin/transaction',component:TransactionComponent},
  {path:'normaluser/account',component:AccountComponent},
  {path:'admin/account',component:AccountComponent},
  {path:'normaluser/details',component:UserdetailsComponent},
  {path:'admin/details',component:UserdetailsComponent},
  {path:'admin/alltransactions',component:TransactioinsComponent},
  {path:'edit',component:UpdateuserComponent},
  {path:'userlist',component:UserlistComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ContactUsComponent,
    AccountComponent,
    TransactionComponent,
    UserlistComponent,
    AdminComponent,
    NormaluserComponent,
    TransactioinsComponent,
    UpdateuserComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule
  ],
  providers: [UserserviceService,TransactionserviceService,CurrentuserService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
