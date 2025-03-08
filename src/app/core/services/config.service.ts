import { Injectable } from '@angular/core';
// 修改路径为相对路径
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  get baseAPI(): string {
    return environment.baseAPI;
  }

  // 其他配置获取方法...
}
