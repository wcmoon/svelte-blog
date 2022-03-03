import {readable, writable} from "svelte/store";
import Cookies from "js-cookie";

export const category = writable({
  name: '',
  _id: ''
})

export const categories = writable([])


export const isLogin = readable(Cookies.get('token'));
