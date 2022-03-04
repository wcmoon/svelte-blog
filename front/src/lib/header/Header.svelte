<script lang="ts">
import logo from '../logo.png';
import arrow from './arrow.png';
import picSearch from './search.png';
import request from "../../utils/request";
import {onMount} from "svelte";
import {debounce} from 'lodash-es'
import {category} from '$lib/store'
import {categories as allCat, isLogin} from "$lib/store";
import {page} from '$app/stores'

let categories = [];
let ulElement;
let showLeftArrow = false;
let showRightArrow = true;

interface Category {
  id: string;
  name: string;
}

onMount(async () => {
  categories = await request('/api/category') as Category[];
  $allCat = categories;
})

const ulScroll = debounce(() => {
  const {scrollLeft, offsetWidth, scrollWidth} = ulElement;
  showLeftArrow = (scrollWidth > offsetWidth && scrollLeft > 0);
  showRightArrow = (scrollWidth > offsetWidth && offsetWidth + scrollLeft < scrollWidth);
}, 40)

function scroll(direction) {
  ulElement.scrollLeft += (100 * direction);
}

function chooseCategory(cate) {
  $category = cate ? cate : {name:'', id: ''};
  if ($page.url.pathname !== '/') {
    location.href = '/';
  }
}
</script>

<header>
  <a href="/" class="logo" on:click={() => {chooseCategory(null)}}>
    <img src={logo} alt="SvelteKit"/>
  </a>

  <nav class="categories">
    CATEGORY
    {#if showRightArrow}
      <div class="arrow-btn" on:click={() => scroll(1)}>
        <img src="{arrow}" class="arrow" alt="right">
      </div>
    {/if}
    <ul bind:this={ulElement} on:scroll={ulScroll} id="scroll-ui">
      {#each categories as category}
        <li class="category" on:click={() => chooseCategory(category)}>{category.name}</li>
      {/each}
    </ul>
    {#if showLeftArrow}
      <div class="arrow-btn reverse" on:click={() => scroll(-1)}>
        <img src="{arrow}" class="arrow" alt="left">
      </div>
    {/if}
    <div class="search-container">
      <img src="{picSearch}" alt="search" class="search-pic">
      <input type="text" placeholder="search">
    </div>
  </nav>


  {#if isLogin}
    <span class="right-btn" on:click={() => {location.href = '/write';}}>WRITE</span>
  {:else}
    <span class="right-btn" style="opacity: 0;cursor: default;" >empty</span>
  {/if}
</header>

<style lang="less">
header {
  padding: 0 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: white;
  box-shadow: 0 -2px 10px rgb(0 0 0 / 15%);

  .logo {
    height: 50px;
    width: 50px;
    display: block;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }

  }

  .categories {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgba(117, 117, 117, 1);
    position: relative;

    .arrow-btn {
      position: absolute;
      width: 24px;
      height: 24px;
      padding: 6px 26px 6px 6px;
      transform: rotate(180deg);
      right: 370px;
      background: linear-gradient(90deg,  rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);

      &.reverse {
        left: 96px;
        transform: rotate(0deg);
      }

      .arrow {
        cursor: pointer;
        width: 24px;
        height: 24px;
      }
    }

    ul {
      min-width: 400px;
      max-width: 560px;
      display: flex;
      flex-direction: row;
      margin: 0 20px;
      scroll-behavior: smooth;
      overflow-x: auto;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      li {
        cursor: pointer;
        flex-shrink: 0;
        line-height: 20px;
        border-radius: 100px;
        background-color: rgba(242, 242, 242, 1);
        transition: background 300ms ease 0s;
        padding: 8px 16px;
        margin: 0 4px;
        list-style: none;

        &:hover {
          background-color: rgb(230, 230, 230);
          color: rgba(41, 41, 41, 1);
        }
      }
    }
  }

  .search-container {
    margin-left: 30px;
    width: 330px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid rgba(230, 230, 230, 1);
    display: flex;
    flex-direction: row;
    align-items: center;

    .search-pic {
      width: 26px;
      height: 26px;
      padding: 7px;
    }

    input {
      border: none;
      height: 38px;
      width: 270px;
      line-height: 38px;
      outline: none;
    }
  }
  .right-btn {
    color: #757575;
    cursor: pointer;

    &:hover {
      color: #333;
      text-decoration: underline;
    }
  }
}


</style>
