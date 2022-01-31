import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import Swal from 'sweetalert2';
import { LoginError } from '../../interfaces/error.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginErr: LoginError = {
    message: {
      text: '',
      error: false
    }
  };
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.validatorService.passwordPattern)]],
  });

  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router,
    private authService: AuthService
  ) { }

  login() {

    const { email, password } = this.myForm.value;

    this.authService.login( email, password)
    .subscribe( resp => {
      if ( resp.ok !== false ) {
        if(resp.user.role === 'USER_ROLE') {
          this.router.navigateByUrl('/dashboard');
        } else if (resp.user.role === 'ADMIN_ROLE') {
          this.router.navigateByUrl('/panel-admin');
        }
      } else {
        let messageError = '';
        messageError += resp.error;
        this.loginErr.message.error = true;
        this.loginErr.message.text = messageError;

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html:  messageError,
        })

      }
    });

  }

  ngOnInit(): void {
    this.loginErr = {
      message: {
        text: '',
        error: false
      }
    };

  }

}
