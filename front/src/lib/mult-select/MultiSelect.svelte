<script lang="ts">
import {categories} from "$lib/store";
import {onMount} from "svelte";
export let selected = [];

let selectedIds = [];
function select(category) {
  const index = selectedIds.indexOf(category._id);
  if (index > -1) {
    selected = [...selected.slice(0, index), ...selected.slice(index + 1)];
  } else {
    if (selected.length >= 4) {
      alert('limit to four');
      return;
    }
    selected = [...selected, category];
  }
  selectedIds = selected.map(item => {
    return item._id;
  })
}

function remove(index) {
  selected = [...selected.slice(0, index), ...selected.slice(index + 1)];
  selectedIds = selected.map(item => {
    return item._id;
  })
}

let showChoose = false;
function show() {
  showChoose = true;
  document.addEventListener("mousedown", onMenuBlur);
}
function onMenuBlur() {
  showChoose = false;
  document.removeEventListener("mousedown", onMenuBlur);
}


onMount(() => {
  selectedIds = selected.map(item => {
    return item._id;
  })
})

</script>

<div class="select-wrapper">
  <ul>
    {#each selected as category, index}
      <li class="selected-li" on:click={() => {remove(index)}}>{category.name}</li>
    {/each}
  </ul>
  <div class="add-wrapper">
    <span class="add-btn" on:click={show}>
      Add Category
    </span>
    {#if showChoose}
      <ul class="all" on:mousedown|stopPropagation>
        {#each $categories as category}
          <li
            class="{selectedIds.indexOf(category._id) > -1 ? 'active': ''}"
            on:click|stopPropagation={() => {select(category)}}
          >{category.name}</li>
        {/each}
      </ul>
    {/if}
  </div>
</div>


<style lang="less">
.select-wrapper {
  display: flex;
  flex-direction: row;
  color: rgb(117, 117, 117);

  ul {
    display: flex;
    flex-direction: row;

    li {
      list-style: none;
      font-size: 14px;
      background-color: rgb(117, 117, 117);
      color: white;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      margin-right: 10px;
      padding: 0 15px;
      cursor: pointer;

      &.selected-li {
        position: relative;
        padding-right: 25px;
        &:after {
          content: ' ';
          background-image: url("../../lib/write/close.png");
          background-size: 12px;
          background-position: center;
          width: 16px;
          height: 16px;
          display: block;
          position: absolute;
          right: 5px;
          top: 7px;
        }
      }
    }
  }
  .add-wrapper {
    position: relative;
    color: rgb(117, 117, 117);

    .add-btn {
      display: inline-block;
      height: 30px;
      border-radius: 15px;
      font-size: 12px;
      line-height: 30px;
      padding: 0 12px;
      background-color: rgba(85, 172, 238, .8);
      border: 1px solid white;
      cursor: pointer;
      color: white;
    }

    ul {
      position: absolute;
      width: 280px;
      min-height: 100px;
      padding: 20px;
      z-index: 2;
      background: white;
      display: flex;
      flex-wrap: wrap;
      border-radius: 5px;
      box-shadow: 0 0 5px rgb(0 0 0 / 15%);
      left: 50%;
      margin-left: -140px;
      top: 40px;
      justify-content: flex-start;

      li {
        background-color: #f2f2f2;
        color: rgb(117, 117, 117);

        &.active {
          background-color: rgb(117, 117, 117);
          color: white;
        }
      }
    }
  }
}

</style>
