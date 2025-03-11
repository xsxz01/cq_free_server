export interface LoginCredentials {
    username?: string;
    password?: string;
    captcha?: string;
}


export interface User {
    username: string;
    password: string;
    email: string;
    captcha?: string;
    createdAt?: string; // ISO 8601格式
}
