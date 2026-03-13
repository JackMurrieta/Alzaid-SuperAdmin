// formRegistro.component.ts
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { UbicacionService } from '../../service/ubicacion.service';
import { EstanciaService } from '../../service/estancia.service';

export interface EstanciaPayload {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  isActive: boolean;
}

@Component({
  selector: 'app-form-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formRegistro.component.html',
  styleUrls: ['./formRegistro.component.scss']
})
export class FormRegistroComponent implements OnInit, OnDestroy {

  @Output() estanciaCreada = new EventEmitter<EstanciaPayload>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;
  formSubmitted = false;
  toastVisible = false;
  toastMessage = '';

  estados: string[] = [];
  municipios: string[] = [];
  cpExito = false;
  cpError = false;

  administradores = [
    { id: '1', nombre: 'Rosa López' },
    { id: '2', nombre: 'Mario García' },
    { id: '3', nombre: 'Carlos Pérez' },
    { id: '4', nombre: 'Ana Martínez' },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private ubicacionSvc: UbicacionService,
    private estanciaSvc: EstanciaService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.estados = this.ubicacionSvc.getEstados();
    this.escucharCambioEstado();
    this.escucharCambioCP();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      capacidad: [null, [Validators.required, Validators.min(1)]],
      estatus: ['configuracion'],   // 'configuracion' → isActive: false | 'activa' → isActive: true

      country: ['México'],
      state: ['', Validators.required],
      city: ['', Validators.required],

      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: [''],
      codigoPostal: ['', [Validators.pattern(/^\d{5}$/)]],

      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefonoSecundario: [''],
      sitioWeb: [''],

      horaApertura: ['08:00', Validators.required],
      horaCierre: ['17:00', Validators.required],
      diasOperacion: ['lunes-viernes', Validators.required],

      administrador: [''],
    });
  }

  private escucharCambioEstado(): void {
    this.form.get('state')!.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(estado => {
        this.form.patchValue({ city: '' }, { emitEvent: false });
        this.municipios = estado ? this.ubicacionSvc.getMunicipios(estado) : [];
      });
  }

  private escucharCambioCP(): void {
    this.form.get('codigoPostal')!.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(cp => {
        if (!cp) { this.cpExito = false; this.cpError = false; return; }
        const valido = this.ubicacionSvc.validarCP(cp);
        this.cpExito = valido;
        this.cpError = !valido && cp.length === 5;
      });
  }

  isInvalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || this.formSubmitted);
  }

  private buildAddress(f: any): string {
    return [
      f.calle,
      f.numero,
      f.colonia || null,
      f.codigoPostal ? `CP ${f.codigoPostal}` : null,
    ]
      .filter(Boolean)
      .join(', ');
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;

    const payload: EstanciaPayload = {
      name: f.name,
      description: f.description ?? '',
      address: this.buildAddress(f),
      city: f.city,
      state: f.state,
      country: f.country,
      isActive: f.estatus === 'activa',  // false si "configuracion", true si "activa"
    };

    this.estanciaSvc.crearCentro(payload).subscribe({
      next: () => {
        this.showToast('Centro creado exitosamente ✓');
        this.estanciaCreada.emit(payload);
      },
      error: (err) => {
        this.showToast('Error al crear el centro ✕');
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.cancelar.emit();
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    this.toastVisible = true;
    setTimeout(() => (this.toastVisible = false), 3000);
  }
}