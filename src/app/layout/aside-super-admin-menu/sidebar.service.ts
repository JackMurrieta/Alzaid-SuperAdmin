import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
    isExpanded = signal(false);

    expand() {
        this.isExpanded.set(true);
        document.documentElement.style.setProperty('--current-sidebar-w', '230px');
    }

    collapse() {
        this.isExpanded.set(false);
        document.documentElement.style.setProperty('--current-sidebar-w', '64px');
    }
}