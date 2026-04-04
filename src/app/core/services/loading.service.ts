import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private requestCount = signal(0);

    // el observable que App consume
    readonly loading$ = computed(() => this.requestCount() > 0);

    show() {
        this.requestCount.update(n => n + 1);
    }

    hide() {
        this.requestCount.update(n => Math.max(0, n - 1));
    }
}