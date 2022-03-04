<script context="module">/** @type {import('./[title]').Load} */
import {lowerCase} from "lodash-es";

export async function load({params, fetch, session, stuff}) {
  const url = `http://localhost:5100/api/post?title=${params.title}`;
  const response = await fetch(url);
  const res = await response.json();

  return {
    status: response.status,
    props: {
      article: response.ok && (res)
    }
  };
}
</script>
<script lang="ts">
export let article;
import {isLogin} from "$lib/store";
</script>

<section>
  <p class="time">{new Date(article.updatedAt).toLocaleString()}</p>
  <h1 class="title">{article.title}</h1>
  <!--  <img src="{article.photo}" alt="banner">-->
  <img
    src="https://svelte-blog-1253393686.cos.ap-shanghai.myqcloud.com/71292531_2407325295982945_4982031951620734976_n.jpeg"
    alt="banner">
  <article class="">{@html article.description}</article>
  <div class="footer">
    <ul class="categories">
      {#each article.categories as category}
        <li class="cate">{category}</li>
      {/each}
    </ul>
    <span class="cost-time"></span>
    {#if isLogin}
      <div class="tools">
        <span class="tool">Edit</span>
        <span class="tool">Delete</span>
      </div>
    {/if}
  </div>

</section>

<style lang="less">
section {
  margin: 0 auto;
  width: 690px;

  .title {
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  img {
    width: 100%;
    margin-bottom: 30px;
  }

  .footer {
    padding: 32px 0;
    width: 100%;
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
        cursor: pointer;
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

}

</style>
