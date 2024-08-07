import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9@_]*')]]
  })

  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService, private router: Router) {

  }

  handleSubmit() {
    console.log(this.logForm.value);
    this.api.userLoginApi(this.logForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success("Login successfull!!")
        sessionStorage.setItem('userDetail', JSON.stringify(res.existingUser))
        sessionStorage.setItem('token', res.token)
        this.logForm.reset()
        this.router.navigateByUrl('')
        console.log(res);
        this.api.getWishListItemCount()
        this.api.getCartItemCount()
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err)
      }
    })
  }

}
