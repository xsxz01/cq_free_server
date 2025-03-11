export interface AlertConfig {
    message: string;
    type: AlertType;
    position?: Position;
    duration?: number;
    closable?: boolean;
    _timer?: any;
    _resolve?: () => void;
}

export type AlertType = 'success' | 'error' | 'warning';
export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
