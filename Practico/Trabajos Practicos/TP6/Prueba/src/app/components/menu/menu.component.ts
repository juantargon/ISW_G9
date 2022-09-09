import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor() {}

  active = 1;

  nombre2="Google";
  nombre3="";

  deshabilitarNombre = false;
  metodoDePago = false;
  textoPago = 'No se ha seleccionado opción de pago.';
  textoPagoFinal = '';

  getMetodoDePago() {
    this.metodoDePago = false;
  }

  setMetodoDePago(event: Event) {
    if ((<HTMLInputElement>event.target).id == 'efectivo') {
      this.textoPagoFinal = 'Se optó por efectivo.';
    } else {
      this.textoPagoFinal = 'Se optó por tarjeta.';
    }
  }

  getNombre(value: string) {}



  ngOnInit(): void {}
}
