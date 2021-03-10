import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CarouselImageComponent } from './carousel-image/carousel-image.component';
import { ContactComponent } from './contact/contact.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { DetailCompteComponent } from './detail-compte/detail-compte.component';
import { FacturationComponent } from './detail-compte/facturation/facturation.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HomeComponent } from './home/home.component';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { PanierComponent } from './panier/panier.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ValidationAchatComponent } from './validation-achat/validation-achat.component';

const routes: Routes = [

  {
    path: "home",
    component: HomeComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: ''
        }
      ]
    }
  },
  {
    path: "auth/signin",
    component: SigninComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Connexion',
          url: ''
        }
      ]
    }
    
  },
  {
    path: "auth/signup",
    component: SignupComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Inscription',
          url: ''
        }
      ]
    }
  },
  {
    path: "liste",
    component: ListeArticleComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: `Liste d'articles`,
          url: ''
        }
      ]
    }
  },
  {
    path: "liste/view/:id",
    component: DetailArticleComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Liste des comics',
          url: 'liste'
        },
        {
          label: 'Détail',
          url: ''
        }
      ]
    }
  },
  {
    path: "contact",
    component: ContactComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Contact',
          url: ''
        }
      ]
    }
  },
  {
    path: "panier",
    component: PanierComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Panier',
          url: ''
        }
      ]
    }
  },
  {
    path: "validation-achat",
    canActivate: [AuthGuardService],
    component: ValidationAchatComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Panier',
          url: 'panier'
        },
        {
          label: `Validation d'achat`,
          url: ''
        }
      ]
    }
  },
  {
    path: "detail-compte",
    canActivate: [AuthGuardService],
    component: DetailCompteComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Mon compte',
          url: ''
        }
      ]
    }
  },
  {
    path: "detail-compte/facturation",
    canActivate: [AuthGuardService],
    component: FacturationComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Mon compte',
          url: 'detail-compte'
        },
        {
          label: 'Facturation',
          url: ''
        }
      ]
    }
  },
  {
    path: "liste/view/:id",
    component: DetailArticleComponent,
    data: {
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: `Liste d'article`,
          url: 'liste'
        },
        {
          label: 'Detail',
          url: ''
        }
      ]
    }
  },
  {
    path: "not-found",
    component: FourOhFourComponent,
    data: {
      title: 'Not found 404',
      breadcrumb: [
        {
          label: 'Accueil',
          url: 'home'
        },
        {
          label: 'Not found 404',
          url: ''
        }
      ]
    }
  },
  {
    path: "",
    component: HomeComponent,
    data: {
      title: 'Accueil',
      breadcrumb: [
        {
          label: 'Accueil',
          url: ''
        }
      ]
    }
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
