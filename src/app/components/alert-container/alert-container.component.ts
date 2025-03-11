import { Component } from '@angular/core';
import { AlertService } from '../../service/alert.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import type { AlertConfig } from './alert-config.interface';
import * as boostrapIcons from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-alert-container',
    standalone: true,
    imports: [NgIcon, CommonModule],
    viewProviders: [
        provideIcons(boostrapIcons)
    ],
    templateUrl: './alert-container.component.html',
    styleUrls: ['./alert-container.component.css']
})
export class AlertContainerComponent {
    currentAlert: AlertConfig | null = null;

    constructor(public service: AlertService) {
        service.alerts$.subscribe(alert => {
            this.currentAlert = alert;
        });
    }

    get icon() {
        return {
            success: 'bootstrapCheckCircle',
            error: 'bootstrapXCircle',
            warning: 'bootstrapExclamationTriangle'
        }[this.currentAlert?.type || 'success'];
    }

    get alertClass() {
        return this.currentAlert?.position || 'top-right';
    }
}
