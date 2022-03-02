<script lang="ts">
import {category} from "$lib/store";
import label from './label.png';
</script>

<section class="content">
  <div class="category">
    <img src="{label}" alt="label">
    {$category.name}
  </div>
  <nav class="sort">
    <span class="sort-type">Trending</span>
    <span class="sort-type">Latest</span>
  </nav>
  <ul>

    <li class="post">
      <span class="time"></span>
      <div class="preview">
        <h2 class="title">title</h2>
        <article class="preview"></article>
      </div>
      <div class="tips">
        <ul class="categories">
          <li class="category"></li>
        </ul>
        <span class="cost-time"></span>
      </div>
    </li>

  </ul>
</section>

<style>
.content {
    margin-top: 30px;
    width: 1050px;
}
</style>
