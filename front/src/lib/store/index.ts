import {readable, writable} from "svelte/store";
import Cookies from "js-cookie";
import { browser } from "$app/env";

let initCategory = {
  name: '',
  id: ''
};
if (browser) {
  initCategory = JSON.parse(localStorage.getItem('category')) || initCategory;
}
export const category = writable(initCategory)
if (browser) {
  category.subscribe(val => localStorage.setItem("category", JSON.stringify(val)));
}

export const categories = writable([])


export const isLogin = readable(Cookies.get('token') !== '');
