// src/app/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';

export const authGuard: CanActivateFn = (route, state) => {
  
 
  const autenticacaoService = inject(AutenticacaoService);
  const router = inject(Router);

  
  if (autenticacaoService.logado()) {
    return true; 
  }

  
  router.navigate(['/login']); 
  return false; 
};