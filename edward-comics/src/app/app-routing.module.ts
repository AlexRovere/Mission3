import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { DetailCompteComponent } from './detail-compte/detail-compte.component';
import { FacturationComponent } from './detail-compte/facturation/facturation.component';
import { ModificationMdpComponent } from './detail-compte/modification-mdp/modification-mdp.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HomeComponent } from './home/home.component';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { PanierComponent } from './panier/panier.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ValidationAchatComponent } from './validation-achat/validation-achat.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "auth/signin",
    component: SigninComponent
  },
  {
    path: "auth/signup",
    component: SignupComponent
  },
  {
    path: "liste",
    component: ListeArticleComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "panier",
    component: PanierComponent
  },
  {
    path: "validation-achat",
    canActivate: [AuthGuardService],
    component: ValidationAchatComponent
  },
  {
    path: "detail-compte",
    canActivate: [AuthGuardService],
    component: DetailCompteComponent
  },
  {
    path: "detail-compte/facturation",
    canActivate: [AuthGuardService],
    component: FacturationComponent
  },
  {
    path: "detail-compte/modification-mdp",
    canActivate: [AuthGuardService],
    component: ModificationMdpComponent
  },
  {
    path: "not-found",
    component: FourOhFourComponent
  },
  {
    path: "",
    component: ListeArticleComponent
  },
  {
    path: "**",
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
