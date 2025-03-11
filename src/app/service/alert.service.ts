import { Injectable, ApplicationRef, Injector, createComponent } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { AlertConfig, Position } from '../components/alert-container/alert-config.interface';
import { AlertContainerComponent } from '../components/alert-container/alert-container.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private containerCreated = false;
    private alertSubject = new BehaviorSubject<AlertConfig | null>(null);
    alerts$ = this.alertSubject.asObservable();

    constructor(
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    private ensureContainerExists() {
        if (!this.containerCreated) {
            const componentRef  = createComponent(AlertContainerComponent, {
                environmentInjector: this.appRef.injector,
                elementInjector: this.injector
            });
            this.appRef.attachView(componentRef.hostView);
            document.body.appendChild(componentRef.location.nativeElement);
            this.containerCreated = true;
        }
    }

    show(config: AlertConfig): Promise<void> {
        return new Promise((resolve) => {
            this.ensureContainerExists();
            const duration = config.closable === false ? 
                Infinity : 
                (config.duration || 3000);
            
            const timer = setTimeout(() => {
                this.close();
                resolve(); // 自动关闭时完成 Promise
            }, duration);
    
            this.alertSubject.next({
                ...config,
                _timer: timer,
                _resolve: resolve // 将 resolve 函数绑定到配置对象
            });
        });
    }
      
    close() {
        const current = this.alertSubject.getValue();
        if (current?._timer) {
            clearTimeout(current._timer);
        }
        if (current?._resolve) {
            current._resolve(); // 手动关闭时完成 Promise
        }
        this.alertSubject.next(null);
    }

    async success(message: string, position?: Position): Promise<void> {
        return this.show({ message, type: 'success', position });
    }
    
    async error(message: string, position?: Position): Promise<void> {
        return this.show({ message, type: 'error', position });
    }
    
    async warning(message: string, position?: Position): Promise<void> {
        return this.show({ message, type: 'warning', position });
    }

}
