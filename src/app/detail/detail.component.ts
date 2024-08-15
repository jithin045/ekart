import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pid: any = ""
  product: any = {}

  constructor(private ar: ActivatedRoute, private api: ApiService, private toastr: ToastrService) {
    this.ar.params.subscribe((res: any) => {
      console.log(res);
      this.pid = res.id
    })
  }

  ngOnInit(): void {
    this.api.getProduct(this.pid).subscribe({
      next: (res: any) => {
        console.log(res);
        this.product = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  addWish(product: any) {
    if (sessionStorage.getItem('token')) {
      const { id, title, description, price, category, image, rating } = product
      this.api.addWishListApi({ id, title, description, price, category, image, rating }).subscribe({
        next: (res: any) => {
          this.toastr.success("Product Added To Wishlist")
          this.api.getWishListItemCount()
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(err.error)
        }
      })
    }
    else {
      this.toastr.warning("Please Login First")
    }
  }


  addCart(product: any) {
    if (sessionStorage.getItem('token')) {
      const { id, title, price, image } = product
      this.api.addToCartApi({ id, title, price, image }).subscribe({
        next: (res: any) => {
          this.toastr.success(res)
          this.api.getCartItemCount()

        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(err.error)
        }
      })
    }
    else {
      this.toastr.warning("Please Login First")
    }
  }

}
