<script lang="ts">
import {category, isLogin} from "$lib/store";
import {onMount} from "svelte";
import request from "../../utils/request";

let posts = [];
let handlePost = {title: ''};
let dialogElement;
let sortType = 0; // 0: trending 1: latest
onMount(async () => {
  await getPosts();
})
async function getPosts() {
  let params = {
    categories: $category.name,
    sort: sortType
  }
  posts = await request('/api/posts', {
    params
  }) as [];
}
function showDeleteConfirm(post) {
  handlePost = post;
  dialogElement.showModal();
}
async function deletePost() {
  const res = await request('/api/post', {
    method: 'delete',
    body: {
      title: handlePost.title
    }
  })
  if (!res) return;
  dialogElement.close();
  await getPosts();
}
$:{
  $category.name & getPosts();
}

</script>

<section class="content">
  <div class="category">
    {$category.name || 'All'}
  </div>
  <nav class="sort">
    <span
      on:click={() => sortType = 0}
      class="sort-type {sortType === 0 ? 'active' : ''}"
    >Trending</span>
    <span
      on:click={() => sortType = 1}
      class="sort-type {sortType === 1 ? 'active' : ''}"
    >Latest</span>
  </nav>
  <ul>

    {#each posts as post}
      <li class="post">
        <span class="time">{
          new Date(post.updatedAt).toLocaleString()
        }</span>
        <div class="preview" on:click={() => {location.href=`/post/${post.title}`}}>
          <h2 class="title">{post.title}</h2>
          <article class="post-content">{@html post.description}</article>
        </div>
        <div class="tips">
          <ul class="categories">
            {#each post.categories as category}
              <li class="cate">{category}</li>
            {/each}
          </ul>
          <span class="cost-time"></span>
          {#if $isLogin}
            <div class="tools">
              <span class="tool">Edit</span>
              <span class="tool" on:click={() => showDeleteConfirm(post)}>Delete</span>
            </div>
          {/if}
        </div>
<!--        <img src="{post.photo}" alt="photo">-->
        <img src="https://svelte-blog-1253393686.cos.ap-shanghai.myqcloud.com/71292531_2407325295982945_4982031951620734976_n.jpeg" alt="">
      </li>
    {/each}

  </ul>
  <dialog bind:this={dialogElement}>
    Sure to delete <span class="post-title">{handlePost.title}</span> ?
    <div class="btns">
      <input type="button" value="Yes" on:click={deletePost}>
      <input type="button" value="Cancle" on:click={() => dialogElement.close()}>
    </div>
  </dialog>
</section>

<style lang="less">
.content {
  margin-top: 30px;
  width: 1050px;

  .category {
    font-size: 42px;
    line-height: 52px;
    font-weight: 600;
    text-transform: capitalize;
    text-indent: 36px;
    position: relative;

    &:before {
      display: block;
      content: ' ';
      width: 28px;
      height: 28px;
      background-color: #f2f2f2;
      border-radius: 14px;
      background-image: url("./label.png");
      background-size: 16px;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: 12px;
    }
  }

  .sort {
    font-size: 14px;
    line-height: 20px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    padding: 8px 0 0 10px;
    height: 52px;

    span {
      display: inline-block;
      padding: 16px 0;
      margin-right: 18px;
      color: rgba(117, 117, 117, 1);
      cursor: pointer;

      &.active {
        color: rgba(41, 41, 41, 1);
        border-bottom: 1px solid rgba(41, 41, 41, 1);
      }
    }
  }

  ul {
    li {
      list-style: none;

      &.post {
        border-bottom: 1px solid rgba(230, 230, 230, 1);
        padding-top: 24px;
        position: relative;
        .time {
          line-height: 20px;
          font-size: 14px;
          color: rgba(117, 117, 117, 1);
        }
        .preview {
          width: calc(100% - 150px);
          padding-top: 12px;
          cursor: pointer;
          .title {
            line-height: 28px;
            font-size: 22px;
            margin: 0;
            text-transform: capitalize;
            font-weight: 600;
            padding-bottom: 8px;
          }
          .post-content {
            height: 72px;
            overflow: hidden;
            * {
              margin: 0;
              padding: 0;
              font-size: 14px!important;
            }
          }
        }
        .tips {
          padding: 32px 0;
          width: calc(100% - 150px);
          display: flex;
          flex-direction: row;
          align-items: center;

          .categories {
            display: flex;
            flex-direction: row;
            .cate {
              font-size: 13px;
              line-height: 24px;
              border-radius: 12px;
              padding: 0 12px;
              background-color: rgba(242, 242, 242, 1);
              margin-right: 10px;
            }
          }

          .tools {
            margin-left: auto;
            color: #757575;
            font-size: 13px;
            cursor: pointer;
            .tool {
              margin-left: 10px;
              &:hover {
                color: #333;
                text-decoration: underline;
              }
            }


          }
        }
        img {
          width: 112px;
          height: 112px;
          aspect-ratio: auto 112/112;
          object-fit: cover;
          position: absolute;
          right: 0;
          top: 70px;
        }
      }
    }
  }
}
dialog {
  box-shadow: 0 0 10px rgb(0 0 0 / 15%);
  border: none;
  border-radius: 10px;
  padding: 30px;
  font-size: 22px;
  .post-title {
    font-weight: 600;
    color: #55acee;
    text-transform: capitalize;
  }
  .btns {
    font-size: 14px;
    margin-top: 30px;
    justify-content: flex-end;
    display: flex;
    input[type=button] {
      height: 24px;
      padding: 0 12px;
      border-radius: 12px;
      border: none;
      margin-left: 10px;
      color: white;
      cursor: pointer;
      background-color: rgba(85, 172, 238, 0.8);

      &:hover {
        background-color: rgba(85, 172, 238, 1);
      }
    }
  }
}
</style>
