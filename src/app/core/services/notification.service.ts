// core/services/notification.service.ts
import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    id: number;
    message: string;
    type: NotificationType;
    duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private _notifications = signal<Notification[]>([]);
    readonly notifications = this._notifications.asReadonly(); // ← solo lectura desde afuera
    private counter = 0;

    show(message: string, type: NotificationType = 'info', duration = 4000) {
        const id = ++this.counter;
        this._notifications.update(n => [...n, { id, message, type, duration }]);

        if (duration > 0) {
            setTimeout(() => this.dismiss(id), duration);
        }
    }

    success(message: string) { this.show(message, 'success'); }
    error(message: string) { this.show(message, 'error', 8000); }
    warning(message: string) { this.show(message, 'warning'); }
    info(message: string) { this.show(message, 'info'); }

    dismiss(id: number) {
        this._notifications.update(n => n.filter(x => x.id !== id));
    }
}