import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop'; // ← 
import { LoadingService } from './core/services/loading.service';
import { LoadingComponent } from './shared/components/loading.component/loading.component';
import { ToastComponent } from './shared/components/toast.component/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, LoadingComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('alzaid-superadmin');
  protected readonly loadingSvc = inject(LoadingService);
}