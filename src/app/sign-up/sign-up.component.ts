import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, Hub } from 'aws-amplify';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, public loader: LoaderService,) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loader.loading = true;

    const user = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      attributes: {
        'custom:firstname': this.registerForm.value.firstName,
        'custom:lastname': this.registerForm.value.lastName,
        phone_number: "+" + this.registerForm.value.phone.toString()
      }
    }
    Auth.signUp(user)
  }
}
