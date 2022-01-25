import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {
    console.log(this.router.getCurrentNavigation()?.extras?.state);
    let data: any = this.router.getCurrentNavigation()?.extras?.state;
    this.msg = data?.decoded?.email;
  }
  msg: string = ""
  email: string = '';

  ngOnInit() {
    this.email = "";

    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user)
        this.msg = user.attributes['custom:firstname'];
      })
      .catch(() => {
        console.log("Not signed in", this.msg);
        if (!this.msg) {
          this.router.navigateByUrl('login');
        }
      });

  }

  onLogoutClick() {
    console.log("Logout Clicked");
    Auth.signOut({ global: true })
  }
}
