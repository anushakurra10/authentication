import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, Hub } from 'aws-amplify';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  submitted = false;
  message = {
    type: '',
    text: ''
  };
  constructor(
    private router: Router, public loader: LoaderService,
  ) { }

  ngOnInit(): void {
    const listener = (data: any) => {
      console.log(data)
      this.message = {
        type: '',
        text: ''
      };
      switch (data.payload.event) {
        case 'signIn':
          this.message.type = 'success'
          this.message.text = data.payload.data.message;
          this.loader.loading = false;
          this.router.navigateByUrl('dashboard')
          break;
        case 'signUp':
          this.message.type = 'success'
          this.message.text = data.payload.message;
          this.loader.loading = false;
          this.router.navigateByUrl('login')
          break;
        case 'signOut':
          this.router.navigateByUrl('login')
          break;
        case 'signUp_failure':
          this.message.type = 'error'
          this.message.text = data.payload.data.message;
          this.loader.loading = false;
          break;
        case 'signIn_failure':
          this.message.type = 'error'
          this.message.text = data.payload.data.message;
          this.loader.loading = false;
          break;
        case 'forgotPassword':
          this.message.type = 'success'
          this.message.text = data.payload.message;
          this.loader.loading = false;
          break;
        case 'forgotPassword_failure':
          this.message.type = 'error'
          this.message.text = data.payload.data.message;
          this.loader.loading = false;
          break;
        case "forgotPasswordSubmit":
          this.message.type = 'success'
          this.message.text = data.payload.data.message;
          this.loader.loading = false;
          this.router.navigateByUrl('login')
          break;
        case "forgotPasswordSubmit_failure":
          this.message.type = 'error'
          this.message.text = data.payload.data.message;
          this.loader.loading = false;
          break;
      }
    }

    Hub.listen('auth', listener);
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.message = user.attributes['custom:firstname'];
        this.router.navigateByUrl('login')
      })
      .catch(
        (err) => {
          console.log("Not signed in", err);
          console.log(location.pathname);
        })
  }
}
