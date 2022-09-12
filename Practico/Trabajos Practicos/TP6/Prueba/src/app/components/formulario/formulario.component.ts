import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  NgForm,
  FormControl,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  DirecDeEntrega = "Dirección de Entrega";
  FormaDePago = "Forma de Pago:";
  DatosDelTitular = "Datos Del Titular";
  DatosDeTarjeta = "Datos de Tarjeta";
  CuandoPedido = "¿Cuándo desea recibir el pedido?";

  FlagPagoEfectivo = true;
  Monto = 0;
  TarNombre = "";
  TarApellido = "";
  TarNumero = "";
  TarCodigoSeguridad = "";
  TarFechaExpiracion = "";

  MinDate = new Date();
  MaxDate = new Date(2022,8,20);

  FlagHoraEspecifica = false;
  HoraEntrega = "";
  FechaEntrega = "";

  Total = 1499;
  FlagBorroPedido =  false;

  Mensajes = {
    RD: " Revisar los datos ingresados...",
    BP: " Pedido cancelado: No hay productos en el carrito..."
  };

  // opciones del combo activo
  OpcionesCiudad = [
    { value: 1, Nombre: "BUENOS AIRES" },
    { value: 2, Nombre: "CORDOBA" },
    { value: 3, Nombre: "MENDOZA" },
    { value: 4, Nombre: "SALTA" },
  ];

  FormRegistro = new FormGroup({
    Calle: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*"),
    ]),
    Numero: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9]{1,7}"),
    ]),
    Ciudad: new FormControl('', [
      Validators.required,
    ]),
    Aclaraciones: new FormControl(""),

    Monto: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9]{1,5}"),
    ]),

    Nombre: new FormControl(""),
    Apellido: new FormControl(""),
    NumeroTarjeta: new FormControl(""),
    CodigoSeguridad: new FormControl(""),
    FechaExpiracion: new FormControl(""),
    HoraEntrega: new FormControl(""),
    FechaEntrega: new FormControl(""),
  });

  Matcher = new MyErrorStateMatcher();

  Submitted = false;

  constructor() {}

  ngOnInit(): void {}

  // grabar tanto altas como modificaciones
  grabar() {
    this.Submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegistro.invalid || this.FlagBorroPedido || this.Monto < this.Total) {
      return;
    }
    alert("Se registro su pedido con exito.");
  }

  mostrarCamposPago(event: Event) {
    const Monto = this.FormRegistro.get("Monto");
    const Nombre = this.FormRegistro.get("Nombre");
    const Apellido = this.FormRegistro.get("Apellido");
    const NumeroTarjeta = this.FormRegistro.get("NumeroTarjeta");
    const CodigoSeguridad = this.FormRegistro.get("CodigoSeguridad");
    const FechaExpiracion = this.FormRegistro.get("FechaExpiracion");

    if ((<HTMLInputElement>event.target).id == "efectivo") {
      this.FlagPagoEfectivo = true;

      this.limpiarDatosTarjeta();

      Monto?.setValidators([
        Validators.required,
        Validators.pattern("[0-9]{1,5}"),
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
      this.FlagPagoEfectivo = false;

      this.Monto = 0;

      Monto?.clearValidators();
      Monto?.updateValueAndValidity();

      Nombre?.setValidators([
        Validators.required,
        Validators.pattern("[a-zA-Z ]*"),
      ]);
      Apellido?.setValidators([
        Validators.required,
        Validators.pattern("[a-zA-Z ]*"),
      ]);
      NumeroTarjeta?.setValidators([
        Validators.required,
        Validators.pattern("5[0-9]{15}"),
      ]);
      CodigoSeguridad?.setValidators([
        Validators.required,
        Validators.pattern("[0-9]{3}"),
      ]);
      FechaExpiracion?.setValidators([
        Validators.required,
        Validators.pattern("(0[9]|1[012])[/](20)(2[2-9]|3[0-9]|4[0-9])"),
      ]);
    }
  }

  limpiarDatosTarjeta() {
    this.TarNombre = "";
    this.TarApellido = "";
    this.TarNumero = "";
    this.TarCodigoSeguridad = "";
    this.TarFechaExpiracion = "";
  }

  mostrarCamposEntrega(event: Event) {
    const HoraEntrega = this.FormRegistro.get("HoraEntrega");
    const FechaEntrega = this.FormRegistro.get("FechaEntrega'");

    if ((<HTMLInputElement>event.target).id == "fechaEspec") {
      this.FlagHoraEspecifica = true;

      HoraEntrega?.setValidators([
        Validators.required,
        Validators.pattern("(0[0-9]|1[0-9]|2[0-3])[:]([0-5][0-9])"),
      ]);
      FechaEntrega?.setValidators([
        Validators.required,
      ]);
    } else {
      this.FlagHoraEspecifica = false;

      this.HoraEntrega = "";
      this.FechaEntrega = "";

      HoraEntrega?.clearValidators();
      HoraEntrega?.updateValueAndValidity();

      FechaEntrega?.clearValidators();
      FechaEntrega?.updateValueAndValidity();
    }
  }

  borrarPedido(event:Event) {
    this.FlagBorroPedido = true;
    this.Total = 0;
  }
}
