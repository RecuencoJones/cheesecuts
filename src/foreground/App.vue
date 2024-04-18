<template>
  <div class="app-wrapper theme-default">
    <main class="app-view shortcuts">
      <article v-for="group in groups" class="shortcuts-group">
        <h3 class="shortucts-group__title">{{ group.name }}</h3>
        <ul class="shortcuts-list">
          <li class="shortcuts-list__item" v-for="item in group.items" :key="item.keys + item.name">
            <span>{{ item.name }}</span>
            <pre>{{ item.keys }}</pre>
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groups: []
    }
  },
  computed: {
    commandOrControl() {
      return window.os === 'darwin' ? '⌘' : 'Ctrl';
    }
  },
  methods: {
    async loadShortcuts() {
      const groups = await api.getShortcuts();

      this.groups = groups;
    }
  },
  async mounted() {
    await this.loadShortcuts();
  }
}
</script>

<style lang="scss">

.app-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--color-main-text);
  background-color: var(--color-main-background);

  .app-view {
    flex: 1;
    overflow: auto;
  }
}

.shortcuts {
  padding: 0 1rem;
  font-size: .85rem;
  font-family: Arial, Helvetica, sans-serif;

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
          display: block;
          width: auto;
          margin: 0;
        }
      }
    }
  }
}
</style>
