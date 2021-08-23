import {Injectable} from '@angular/core';
import {Cart, CartItem} from "../models/cart";
import {BehaviorSubject, Subject} from "rxjs";

export const CART_KEY = 'cart'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() {
  }

  initialCart(): any {
    if(! this.getCart()){
      const initialCart = {
        items: []
      }
      const initialCartJson = JSON.stringify(initialCart)
      localStorage.setItem(CART_KEY, initialCartJson)
    }else{
      this.getCart()
    }
  }

  getCart(): Cart {
    return JSON.parse(localStorage.getItem(CART_KEY) || '{}')
  }

  addItemToCart(cartItem: CartItem): Cart {
    let current_cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}')
    console.log(current_cart.items)
    if(current_cart.items.length > 0){
      const cartItemExist = current_cart?.items.find((item: CartItem) => item.productId === cartItem.productId)
      if (cartItemExist) {
        let product;
        let index;
        for (let i = 0; i < current_cart.items.length; i++) {
          product = current_cart.items[i]
          if (product.productId == cartItem.productId) {
            index = i
            break
          }
        }

        current_cart.items.splice(index, 1)

        product.quantity += cartItem.quantity

        current_cart.items.push(product)

        const initialCartJson = JSON.stringify(current_cart)
        localStorage.setItem(CART_KEY, initialCartJson)
        this.cart$.next(current_cart)
        return current_cart
      } else {
        current_cart.items.push(cartItem)
        const initialCartJson = JSON.stringify(current_cart)
        localStorage.setItem(CART_KEY, initialCartJson)
        this.cart$.next(current_cart)
        return current_cart
      }
    }else {
      current_cart.items.push(cartItem)
      const initialCartJson = JSON.stringify(current_cart)
      localStorage.setItem(CART_KEY, initialCartJson)
      this.cart$.next(current_cart)
      return current_cart
    }

  }
}
