import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any = []
  carttotal: any = 0
  couponStatus: boolean = false
  couponCheckStatus: boolean = false
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.api.getCartApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartItems = res
        this.getTotalAmount()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  deleteItem(id: any) {
    this.api.removeCartApi(id).subscribe({
      next: (res: any) => {
        this.toastr.success("Item Removed from Cart !!")
        this.api.getCartItemCount()
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err.error)
      }
    })
  }

  incQuantity(id: any) {
    this.api.incCartQuantityApi(id).subscribe({
      next: (res: any) => {
        this.toastr.success(res)
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err.error)
      }
    })
  }

  decQuantity(id: any) {
    this.api.decCartQuantityApi(id).subscribe({
      next: (res: any) => {
        this.toastr.success(res)
        this.ngOnInit()
        this.api.getCartItemCount()
      },
      error: (err: any) => {
        this.toastr.error(err.error)
      }
    })
  }

  emptyCartItems() {
    this.api.emptyCartApi().subscribe({
      next: (res: any) => {
        this.toastr.success(res)
        this.ngOnInit()
        this.api.getCartItemCount()
      },
      error: (err: any) => {
        this.toastr.error(err.error)
      }
    })
  }

  getTotalAmount() {
    this.carttotal = Math.ceil(this.cartItems.map((item: any) => item.totalPrice).reduce((t1: any, t2: any) => t1 + t2))
  }

  offerClick() {
    this.couponStatus = true
  }

  discount50() {
    this.couponCheckStatus = true
    const discount = Math.ceil(this.carttotal * 0.5)
    this.carttotal -= discount
  }

  discount20() {
    this.couponCheckStatus = true
    const discount = Math.ceil(this.carttotal * 0.2)
    this.carttotal -= discount
  }

  discount5() {
    this.couponCheckStatus = true
    const discount = Math.ceil(this.carttotal * 0.05)
    this.carttotal -= discount
  }

  checkout() {
    sessionStorage.setItem('carttotal', this.carttotal)
    this.router.navigateByUrl('/check')
  }

}
