import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { ConfigService } from '../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private config: ConfigService  // 注入配置服务
  ) {}

  // 使用配置的API地址
  getUsers() {
    return this.http.get(`${this.config.baseAPI}/users`);
  }

  // 测试获取环境变量
  getEnvVariable() {
    console.log(this.config.baseAPI);
  }
}
