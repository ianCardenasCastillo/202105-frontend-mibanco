import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDestinatarioComponent } from './add-destinatario/add-destinatario.component';
import { PageNotFoundComponent } from './helpers/page-not-found.component';
import { HistorialComponent } from './historial/historial.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
const routes: Routes = [
  { path: '', redirectTo: '/destinatarios', pathMatch: 'full' },
  {
    path: 'destinatarios',
    component: AddDestinatarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transferencia',
    component: TransferenciaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
