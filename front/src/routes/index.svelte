<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
import Content from '$lib/content/Content.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Content class="content"/>
</section>

<style lang="less">
section {
	display: flex;
	justify-content: center;
}

</style>
