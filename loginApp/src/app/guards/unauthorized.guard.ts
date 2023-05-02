import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  public canActivate() {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}