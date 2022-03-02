import {writable} from "svelte/store";

export const category = writable({
  name: '',
  _id: ''
})


export const categories = writable([])
