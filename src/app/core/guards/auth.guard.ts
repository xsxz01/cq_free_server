import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.currentToken) return true;
  
  // 保持与现有路由风格一致
  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: router.url }
  });
};
