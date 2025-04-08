import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const isEvenGuard: CanActivateFn = (route, _state) => {
    const router = inject(Router);
    const id = route.params['id'];
    if(id % 2 === 0){
      return true;
    }
    else{
      return router.createUrlTree(['/unauthorized']);
    }
};
