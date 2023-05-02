import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/model/user';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  public loading$: Observable<boolean>;


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.loading$ = this.authService.loading$;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  login(user: User) {
    this.authService.login({
      username: user.username,
      password: user.password
    })
      .pipe(
        takeUntil(this.unsubscribe$))
        .subscribe((res) => {
        if (res) {
          this.router.navigate(['home'])
        } else {
          this.toastr.warning('Incorrect login or password. Try again!');
        }
      })
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
