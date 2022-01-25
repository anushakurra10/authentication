import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../loader.service';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent  {

  
  reetPwdForm: any;
  submitted = false;
  constructor(private router: Router,public loader:LoaderService,
    private formBuilder: FormBuilder) { 

      this.reetPwdForm = this.formBuilder.group({
        username: ['', Validators.required]
    });
  }

  get f() { return this.reetPwdForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.reetPwdForm.invalid) {
        return;
    }
    let clientMetadata={
        'url':location.origin
    }
     Auth.forgotPassword(this.reetPwdForm.value.username,clientMetadata)
    this.loader.loading = true;   
}

}
