import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { User } from '../shared/model/user';
import { DefaultData } from '../shared/defaultData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject$: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  private _loading$ = new BehaviorSubject<boolean>(false);
  loading$ = this._loading$.asObservable();

  constructor() {
    this.currentUserSubject$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("userLog") || 'null')
    );
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject$.value;
  }

  login(user: User) {
    let registeredData = localStorage.getItem("updateUser") ?? JSON.stringify(DefaultData);
    if (JSON.stringify(user) === registeredData) {
      this._loading$.next(true)
      localStorage.setItem('userLog', JSON.stringify(user));
      this.currentUserSubject$.next(user)
      return of(true)
        .pipe(
          delay(2000),
          tap({
            finalize: () => { this._loading$.next(false) }
          }),
        )
    }
    return of(false)
  }

  logout() {
    localStorage.removeItem('userLog');
    this.currentUserSubject$.next(null!);
  }
}