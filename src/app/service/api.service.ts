import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private config: ConfigService  // 注入配置服务
  ) {}

  // 基础请求方法
  private request<T>(method: string, endpoint: string, options: any = {}) {
    const url = `${this.config.baseAPI}/${endpoint}`;
    return this.http.request<T>(method, url, {
      ...options,
      withCredentials: true
    });
  }

  // 公开的HTTP方法
  get<T>(endpoint: string, options?: any) {
    return this.request<T>('GET', endpoint, options);
  }

  post<T>(endpoint: string, body: any, options?: any) {
    return this.request<T>('POST', endpoint, { ...options, body });
  }

  put<T>(endpoint: string, body: any) {
    return this.request<T>('PUT', endpoint, body);
  }

  delete<T>(endpoint: string) {
    return this.request<T>('DELETE', endpoint);
  }
}
