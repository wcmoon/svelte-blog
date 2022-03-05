<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import {onMount} from "svelte";
	import request from "../utils/request";
	import Cookies from "js-cookie";

	onMount(async () => {
		if (Cookies.get('token') !== '') {
			request('/api/auth/check', {
				method: 'post'
			}).then(res => {
				console.log(res);
			})
		}
	})

</script>

<Header />

<main>
	<slot  />
</main>



<style>

</style>
