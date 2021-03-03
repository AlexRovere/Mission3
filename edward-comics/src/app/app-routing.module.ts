import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PanierComponent } from './panier/panier.component';
import { ValidationAchatComponent } from './validation-achat/validation-achat.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "auth/signin", component: SigninComponent},
  {path: "auth/signup", component: SignupComponent},
  {path: "contact", component: ContactComponent},
  {path: "panier", component: PanierComponent},
  {path: "validation-achat", component: ValidationAchatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }