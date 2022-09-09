import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [AppComponent, MenuComponent, FormularioComponent, NavbarComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
