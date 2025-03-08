import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  
  if (req.url.startsWith('auth/')) {
    // 排除登录/注册请求
    return next(req);
  }

  return next(
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${auth.currentToken}`)
    })
  );
};
