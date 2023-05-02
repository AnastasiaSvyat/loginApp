import { Injectable } from '@angular/core';
import { User } from '../shared/model/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  updateUser(user: User) {
    localStorage.setItem('updateUser', JSON.stringify(user));
    this.authenticationService.currentUserSubject$.next(user)
  }
}
