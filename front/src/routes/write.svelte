<script lang="ts">
import {marked} from 'marked';
import MultiSelect from "$lib/mult-select/MultiSelect.svelte";
let source = '';
let title = '';
let markdown;
$: {
  markdown = marked.parse(source);
}
let categories = [2,3,4,5,6,6]
let selected = [];

</script>
<section>
  <input bind:value={title} type="text" class="title" placeholder="Input Title"/>
  <MultiSelect bind:categories={categories} bind:selected={selected} />
  <div class="article">
    <input type="button" value="Publish" class="publish-btn">
    <textarea
      bind:value={source}
      class="source article-part"
      placeholder="Input article by markdown"
    ></textarea>
    <div class="output article-part">{@html markdown}</div>
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
      height: calc(100vh - 300px);
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
