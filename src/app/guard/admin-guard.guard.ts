import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.isAdmin();
};
