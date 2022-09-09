import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  DirecDeEntrega = 'Dirección de Entrega';
  FormaDePago = 'Forma de Pago:';
  DatosDelTitular = 'Datos Del Titular';
  DatosDeTarjeta = 'Datos de Tarjeta';
  CuandoPedido = '¿Cuándo desea recibir el pedido?';

  PagoEfectivo = true;
  Monto = '';
  TarNombre = '';
  TarApellido = '';
  TarNumero = '';
  TarCodigoSeguridad = '';
  TarFechaExpiracion = '';

  HoraEspecifica = false;
  HoraEntrega = '';
  FechaEntrega = '';

  Mensajes = {
    RD: ' Revisar los datos ingresados...',
  };

  // opciones del combo activo
  OpcionesCiudad = [
    { Id: 1, Nombre: 'BUENOS AIRES' },
    { Id: 2, Nombre: 'CORDOBA' },
    { Id: 3, Nombre: 'MENDOZA' },
    { Id: 4, Nombre: 'SALTA' },
  ];

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

  constructor() {}

  ngOnInit(): void {}

  // grabar tanto altas como modificaciones
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegistro.invalid) {
      return;
    }
    alert('Se registro su pedido con exito.');
  }

  MostrarCamposPago(event: Event) {
    const Monto = this.FormRegistro.get('Monto');
    const Nombre = this.FormRegistro.get('Nombre');
    const Apellido = this.FormRegistro.get('Apellido');
    const NumeroTarjeta = this.FormRegistro.get('NumeroTarjeta');
    const CodigoSeguridad = this.FormRegistro.get('CodigoSeguridad');
    const FechaExpiracion = this.FormRegistro.get('FechaExpiracion');

    if ((<HTMLInputElement>event.target).id == 'efectivo') {
      this.PagoEfectivo = true;

      this.LimpiarDatosTarjeta();

      Monto?.setValidators([
        Validators.required,
        Validators.pattern('[0-9]{1,5}'),
      ]);

      Nombre?.clearValidators();
      Nombre?.updateValueAndValidity();

      Apellido?.clearValidators();
      Apellido?.updateValueAndValidity();

      NumeroTarjeta?.clearValidators();
      NumeroTarjeta?.updateValueAndValidity();

      CodigoSeguridad?.clearValidators();
      CodigoSeguridad?.updateValueAndValidity();

      FechaExpiracion?.clearValidators();
      FechaExpiracion?.updateValueAndValidity();
    } else {
      this.PagoEfectivo = false;

      this.Monto = '';

      Monto?.clearValidators();
      Monto?.updateValueAndValidity();

      Nombre?.setValidators([
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]);
      Apellido?.setValidators([
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]);
      NumeroTarjeta?.setValidators([
        Validators.required,
        Validators.pattern('5[0-9]{15}'),
      ]);
      CodigoSeguridad?.setValidators([
        Validators.required,
        Validators.pattern('[0-9]{3}'),
      ]);
      FechaExpiracion?.setValidators([
        Validators.required,
        Validators.pattern('(09|1[012])[-/](20)[2-9]{2}'),
      ]);
    }
  }

  LimpiarDatosTarjeta() {
    this.TarNombre = '';
    this.TarApellido = '';
    this.TarNumero = '';
    this.TarCodigoSeguridad = '';
    this.TarFechaExpiracion = '';
  }

  MostrarCamposEntrega(event: Event) {
    const HoraEntrega = this.FormRegistro.get('HoraEntrega');
    const FechaEntrega = this.FormRegistro.get('FechaEntrega');

    if ((<HTMLInputElement>event.target).id == 'fechaEspec') {
      this.HoraEspecifica = true;

      HoraEntrega?.setValidators([
        Validators.required,
        Validators.pattern('(0[0-9]|1[0-9]|2[0-3])[:]([0-5][0-9])'),
      ]);
      FechaEntrega?.setValidators([
        Validators.required,
        Validators.pattern('(2022)[-](09)[-](0[9]|[12][0-9]|3[01])'),
      ]);
    } else {
      this.HoraEspecifica = false;

      this.HoraEntrega = '';
      this.FechaEntrega = '';

      HoraEntrega?.clearValidators();
      HoraEntrega?.updateValueAndValidity();

      FechaEntrega?.clearValidators();
      FechaEntrega?.updateValueAndValidity();
    }
  }
}
