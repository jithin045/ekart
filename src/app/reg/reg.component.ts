import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {

  regForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z@_0-9]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9@_]*')]]
  })

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toastr: ToastrService) {

  }

  handleSubmit() {
    console.log(this.regForm);
    this.api.userRegisterApi(this.regForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success("Registration Successful!!")
        this.regForm.reset()
        this.router.navigateByUrl('log')
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error)

      }
    })
  }


}
