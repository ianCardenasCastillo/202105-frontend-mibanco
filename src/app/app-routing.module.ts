import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDestinatarioComponent } from './add-destinatario/add-destinatario.component';
import { HistorialComponent } from './historial/historial.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

const routes: Routes = [
  // { path: '',   redirectTo: '/destinatarios', pathMatch: 'full' },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
