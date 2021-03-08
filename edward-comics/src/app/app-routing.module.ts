import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { DetailCompteComponent } from './detail-compte/detail-compte.component';
import { HomeComponent } from './home/home.component';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { PanierComponent } from './panier/panier.component';
import { ValidationAchatComponent } from './validation-achat/validation-achat.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "auth/signin", component: SigninComponent},
  {path: "auth/signup", component: SignupComponent},
  {path: "liste", component: ListeArticleComponent},
  {path: "liste/view/:id", component: DetailArticleComponent},
  {path: "contact", component: ContactComponent},
  {path: "panier", component: PanierComponent},
  {path: "validation-achat", component: ValidationAchatComponent},
  {path: "detail-compte", component: DetailCompteComponent},
  {path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
