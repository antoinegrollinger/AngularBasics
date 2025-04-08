import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth.service";

export const denyGuests: CanActivateFn = (route, _state) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    if(authService.isAuthenticated()){
      return true;
    }
    else{
      return router.createUrlTree(['/signup']);
    }
};
