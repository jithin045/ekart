import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishitems: any = []
  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.api.getWishList().subscribe({
        next: (res: any) => {
          this.wishitems = res
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
    else {
      console.log("Please Login");

    }
  }

  deleteWishItem(id: any) {
    this.api.removeWish(id).subscribe({
      next: (res: any) => {
        this.toastr.success("Item Removed!!")
        this.api.getWishListItemCount()
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err.error)
      }
    })
  }


  addCart(product: any) {
    if (sessionStorage.getItem('token')) {
      const { id, title, price, image } = product
      this.api.addToCartApi({ id, title, price, image }).subscribe({
        next: (res: any) => {
          this.toastr.success(res)
          this.deleteWishItem(product._id)
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
