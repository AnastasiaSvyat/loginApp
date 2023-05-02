import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/model/user';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  currentUser: User = this.authenticationService.currentUserValue;

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) { }

  settingData() {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '400px',
      height: '400px',
      data: { user: this.currentUser }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.warning('Congratulations! Account has been changed!');
      }
    })
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
