import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { LoadingComponent } from '../app/shared/components/loading.component/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('alzaid-superadmin');
  isLoading = false;
  // inyectamos el servicio de loading para mostrar el spinner global
  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((state) => {
      this.isLoading = state;
    });
  }

}
