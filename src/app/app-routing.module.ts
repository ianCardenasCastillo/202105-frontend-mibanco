import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDestinatarioComponent } from './add-destinatario/add-destinatario.component';
import { PageNotFoundComponent } from './helpers/page-not-found.component';
import { HistorialComponent } from './historial/historial.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

const routes: Routes = [
  { path: '',   redirectTo: '/destinatarios', pathMatch: 'full' },
  {
    path: 'destinatarios',
    component: AddDestinatarioComponent
  },
  {
    path: 'transferencia',
    component: TransferenciaComponent
  },
  {
    path: 'historial',
    component: HistorialComponent
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
