import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoAdheridoComponent } from './components/pago-adherido/pago-adherido.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(
    { path: 'components//pago-adherido', component: PagoAdheridoComponent }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
