import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

  @Output() buttonClick = new EventEmitter();
  @Input() btn!: string;

  loginForm!: FormGroup;
  currentUser: User = this.authenticationService.currentUserValue;
  hide: Boolean = true;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.currentUser?.username || null, [Validators.required]),
      password: new FormControl(this.currentUser?.password || null, [Validators.required]),
    })
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(user: User): void {
    this.buttonClick.emit(user);
  }
}