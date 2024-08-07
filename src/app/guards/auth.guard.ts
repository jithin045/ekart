import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = () => {

  const api = inject(ApiService)
  const toast = inject(ToastrService)
  const router = inject(Router)
  if (api.isLoggedIn()) {
    return true
  }
  else {
    toast.warning("Please Login First")
    router.navigateByUrl('')
    return false
  }
};
