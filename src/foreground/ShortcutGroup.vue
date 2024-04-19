<template>
  <article class="shortcuts-group" v-if="items.length">
    <h3 class="shortucts-group__title">{{ name }}</h3>
    <ul class="shortcuts-list">
      <li class="shortcuts-list__item" v-for="item in items" :key="item.keys + item.name">
        <span>{{ item.name }}</span>
        <pre>{{ item.keys }}</pre>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  props: [ 'name', 'items' ]
};
</script>

<style lang="scss">
.shortcuts-group {
  .shortucts-group__title {
    margin: 1rem 0 .25rem;
    text-align: center;
  }

  .shortcuts-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;

    .shortcuts-list__item {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: .25rem .5rem;

      &:first-child {
        border-start-start-radius: 5px;
        border-start-end-radius: 5px;
      }

      &:last-child {
        border-end-start-radius: 5px;
        border-end-end-radius: 5px;
      }

      &:nth-child(even) {
        background-color: #efefef;
      }

      &:nth-child(odd) {
        background-color: #dedede;
      }

      > span {
        display: block;
        width: auto;
      }

      > pre {
        font-family: 'Lucida Grande', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        display: block;
        width: auto;
        margin: 0;
      }
    }
  }
}
</style>
