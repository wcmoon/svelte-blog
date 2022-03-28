<script context="module">/** @type {import('./[title]').Load} */

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
import MultiSelect from "$lib/mult-select/MultiSelect.svelte";
import {categories} from "$lib/store";
import {marked} from "marked";
import request from "../../utils/request";
import pkg from 'js-htmlencode';
const { htmlEncode } = pkg;
export let article;
let source = article.source;
let title = article.title;
let description = article.description;
let content;
let photo = article.photo;
$: {
  content = marked.parse(htmlEncode(source));
}
let selected = [];

async function publish() {
  let res = await request('/api/post', {
    method: 'put',
    body: {
      title,
      description,
      username: 'wcmoon',
      categories: selected.map(item => {
        return item.name;
      }),
      photo
    }
  });
  if (!res) return;
  location.href = '/';
}

</script>


<section>
  <input bind:value={title} type="text" class="title" placeholder="Input Title"/>
  <MultiSelect bind:categories={$categories} bind:selected={selected} />
  <input bind:value={photo} type="text" placeholder="Input photo url: 'http://<path>'" class="photo-url">
  <textarea
    bind:value={description}
    class="description"
    placeholder="Input description"
  ></textarea>
  <div class="article">
    <input on:click={publish} type="button" value="Publish" class="publish-btn">
    <textarea
      bind:value={source}
      class="source article-part"
      placeholder="Input article by markdown"
    ></textarea>

    <div class="output article-part">{@html content}</div>
  </div>
</section>

<style lang="less">
section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    text-align: center;
    font-size: 28px;
    border: none;
    outline: none;
    margin-bottom: 20px;
  }

  .photo-url {
    margin-top: 20px;
    width: 500px;
    border: none;
    border-bottom: 1px solid rgb(117, 117, 117);
  }

  .description {
    resize: none;
    width: 480px;
    padding: 16px;
    height: 62px;
    margin-top: 20px;
    outline-color: rgb(85, 172, 238);
    border-radius: 10px;
  }

  .article {
    margin-top: 20px;
    display: flex;
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    position: relative;

    .publish-btn {
      position: absolute;
      right: 0;
      top: -40px;
      height: 36px;
      background-color: rgba(85, 172, 238, .8);
      color: white;
      line-height: 36px;
      border: 1px solid white;
      border-radius: 18px;
      padding: 0 18px;
      cursor: pointer;

      &:hover {
        background-color: rgba(85, 172, 238, 1);
      }
    }

    .article-part {
      border: 1px solid rgb(117, 117, 117);
      border-radius: 10px;
      height: calc(100vh - 432px);
      min-width: 400px;
      flex: 1;
      resize: none;
      padding: 20px;
      outline-color: rgb(85, 172, 238);
    }

    .source {
      margin-right: 20px;
    }

  }


  .category-select {
    display: flex;
    flex-direction: row;
  }
}
</style>
