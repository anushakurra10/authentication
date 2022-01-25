import { Component, NgZone, OnInit } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: any;
  submitted = false;
  constructor(private router: Router, public loader: LoaderService,
    private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    Auth.currentAuthenticatedUser()
      .then(() => {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }).catch((err) => {
        console.log(err);
      })
  }

  ngOnInit(): void {


  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    Auth.signIn(this.loginForm.value)
    this.loader.loading = true;
  }

}
