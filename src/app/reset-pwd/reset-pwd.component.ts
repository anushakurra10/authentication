import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../loader.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPwdComponent {

  reetPwdForm: any;
  submitted = false;
  code: any;
  user: any;
  constructor(private router: Router, public loader: LoaderService, private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.reetPwdForm = this.formBuilder.group({
      newpwd: ['', Validators.required]
    });

    this.route.queryParams
      .subscribe((params: any) => {
        this.code = params.code;
        this.user = params.user;
      })
  }

  get f() { return this.reetPwdForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.reetPwdForm.invalid) {
      return;
    }
    Auth.forgotPasswordSubmit(this.user, this.code, this.reetPwdForm.value.newpwd)
    this.loader.loading = true;
  }
}
