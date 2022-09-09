import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-pedido',
  templateUrl: './registro-pedido.component.html',
  styleUrls: ['./registro-pedido.component.css'],
})
export class RegistroPedidoComponent implements OnInit {

  DirecDeEntrega = 'Dirección de Entrega';

  constructor(private formBuilder: FormBuilder) {}

  registroForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    address: [''],
    dob: [''],
    gender: [''],
  });

  FormRegistro = new FormGroup({
    Calle: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    Numero: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,7}'),
    ]),
    Ciudad: new FormControl(null, [Validators.required]),
    Aclaraciones: new FormControl(''),

    Monto: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,5}'),
    ]),

    Nombre: new FormControl(''),
    Apellido: new FormControl(''),
    NumeroTarjeta: new FormControl(''),
    CodigoSeguridad: new FormControl(''),
    FechaExpiracion: new FormControl(''),

    HoraEntrega: new FormControl(''),
    FechaEntrega: new FormControl(''),
  });

  submitted = false;

  ngOnInit(): void {}
}
