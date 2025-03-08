export interface LoginCredentials {
    username?: string;
    password?: string;
    captcha?: string;
}


export interface User {
    username: string;
    password: string;
    email: string;
    /** 与server-list组件中的时间格式保持一致 */
    createdAt?: string; // ISO 8601格式
}
