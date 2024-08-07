import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = []
  searchKey: any = ""
  constructor(private api: ApiService, private toastr: ToastrService) {

    this.api.searchKeyBS.subscribe((res: any) => {
      this.searchKey = res
    })
  }

  ngOnInit(): void {
    this.api.allProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res
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

