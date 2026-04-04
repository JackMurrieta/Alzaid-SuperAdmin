// shared/toast/toast.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toast-container">
      @for (n of notifSvc.notifications(); track n.id) {
        <div class="toast toast--{{ n.type }}" (click)="notifSvc.dismiss(n.id)">
          <span class="toast__icon">{{ icon(n.type) }}</span>
          <span class="toast__message">{{ n.message }}</span>
          <button class="toast__close">✕</button>
        </div>
      }
    </div>
  `,
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
    protected notifSvc = inject(NotificationService);

    icon(type: string): string {
        const icons: Record<string, string> = {
            success: '✓', error: '✕', warning: '⚠', info: 'ℹ'
        };
        return icons[type] ?? 'ℹ';
    }
}