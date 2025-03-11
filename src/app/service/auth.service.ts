import { Injectable, type OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import type { LoginCredentials, User } from '../models/user.model';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentToken?: string;

  constructor(private api: ApiService) { 
    this.initializeAuthState();
  }

  login(credentials: LoginCredentials) {
    return this.api.post<{ token: string }>(`auth/login?validateCode=${credentials.captcha}`, credentials);
  }

  generateCaptchaPath() {
    return `auth/captcha?t=${Date.now()}`;
  }

  getCaptchaImage() {
    return this.api.get<Blob>(this.generateCaptchaPath(), {
      responseType: 'blob',
      observe: 'response' as const
    }).pipe(
      map(response => (response as HttpResponse<Blob>).body!)
    );
  }

  refreshCaptcha() {
    return this.getCaptchaImage();
  }

  register(userData: User) {
    return this.api.post(`auth/register?validateCode=${userData.captcha}`, userData);
  }

  get currentToken() {
    return this._currentToken || localStorage.getItem('auth_token');
  }

  initializeAuthState() {
    window.addEventListener('logout-request', () => this.logout());
  }
  logout() {
    console.log('logout');
    this._currentToken = undefined;
    localStorage.removeItem('auth_token');
    window.dispatchEvent(new CustomEvent('auth-change', { detail: false }));
  }

  // 设置当前用户的 token
  setToken(token: string) {
    this._currentToken = token;
    localStorage.setItem('auth_token', token);
    window.dispatchEvent(new CustomEvent('auth-change', { detail: true }));
  }

  // 检查用户是否已登录
  isLoggedIn() {
    return !!this.currentToken;
  }
}
