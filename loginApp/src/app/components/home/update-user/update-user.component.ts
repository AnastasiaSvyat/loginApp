import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    private userService: UserService,
  ) { }

  update(user: User) {
    this.userService.updateUser(user)
    this.dialogRef.close(true);
  }

  close(){
    this.dialogRef.close();
  }
}