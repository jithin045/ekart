import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  base_url: any = "https://ekart-server-pkxm.onrender.com"


  wishCountBS = new BehaviorSubject(0)
  cartCountBS = new BehaviorSubject(0)
  searchKeyBS = new BehaviorSubject("")

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('token')) {
      this.getWishListItemCount()
      this.getCartItemCount()

    }
  }

  getWishListItemCount() {
    this.getWishList().subscribe((res: any) => {
      this.wishCountBS.next(res.length)
    })
  }

  getCartItemCount() {
    this.getCartApi().subscribe((res: any) => {
      this.cartCountBS.next(res.length)
    })
  }

  //product operations

  allProducts() {
    return this.http.get(`${this.base_url}/all-products`)
  }

  getProduct(id: any) {
    return this.http.get(`${this.base_url}/get-product/${id}`)
  }

  //user authentication
  userRegisterApi(data: any) {
    return this.http.post(`${this.base_url}/register`, data)
  }
  userLoginApi(data: any) {
    return this.http.post(`${this.base_url}/login`, data)
  }



  appendTokenToHeader() {
    const token = sessionStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  //wishlist operations

  addWishListApi(data: any) {
    return this.http.post(`${this.base_url}/addwish`, data, this.appendTokenToHeader())
  }

  getWishList() {
    return this.http.get(`${this.base_url}/getwish`, this.appendTokenToHeader())
  }

  removeWish(id: any) {
    return this.http.delete(`${this.base_url}/remwish/${id}`, this.appendTokenToHeader())
  }


  //cart operations

  addToCartApi(data: any) {
    return this.http.post(`${this.base_url}/addcart`, data, this.appendTokenToHeader())
  }

  getCartApi() {
    return this.http.get(`${this.base_url}/getcart`, this.appendTokenToHeader())
  }

  removeCartApi(id: any) {
    return this.http.delete(`${this.base_url}/remcart/${id}`, this.appendTokenToHeader())
  }


  incCartQuantityApi(id: any) {
    return this.http.get(`${this.base_url}/inccart/${id}`, this.appendTokenToHeader())
  }

  decCartQuantityApi(id: any) {
    return this.http.get(`${this.base_url}/deccart/${id}`, this.appendTokenToHeader())
  }

  emptyCartApi() {
    return this.http.delete(`${this.base_url}/emptycart`, this.appendTokenToHeader())
  }


  // authentication

  isLoggedIn() {
    return !!sessionStorage.getItem('token')
  }


}
