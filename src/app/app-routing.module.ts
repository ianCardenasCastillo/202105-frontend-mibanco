import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDestinatarioComponent } from './add-destinatario/add-destinatario.component';

const routes: Routes = [
  // { path: '',   redirectTo: '/destinatarios', pathMatch: 'full' },
  {
    path:'destinatarios',
    component: AddDestinatarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
