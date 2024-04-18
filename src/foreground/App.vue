<template>
  <div class="app-wrapper theme-default">
    <main class="app-view shortcuts">
      <div class="no-shortcuts-config" v-if="!groups || !groups.length" @click="handleEditShortcuts">
        <span>No shortcuts found! Edit <pre>shortcuts.yaml</pre> to get started.</span>
      </div>
      <template v-else>
        <input class="shortcuts-search" v-model="search" placeholder="Search" autofocus />
        <ShortcutGroup v-for="group in groups" :key="group.name" :name="group.name" :items="filter(group.items)" />
      </template>
    </main>
  </div>
</template>

<script>
import ShortcutGroup from './ShortcutGroup.vue';

export default {
  components: {
    ShortcutGroup
  },
  data() {
    return {
      search: '',
      groups: []
    };
  },
  computed: {
    commandOrControl() {
      return window.os === 'darwin' ? '⌘' : 'Ctrl';
    },
  },
  methods: {
    async loadShortcuts() {
      const groups = await api.getShortcuts();

      this.groups = groups;
    },
    async handleEditShortcuts() {
      api.editShortcuts();
    },

    filter(items) {
      const searchTerm = this.search.toLowerCase();

      return searchTerm
        ? items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.keys.toLowerCase().includes(searchTerm)
        )
        : items;
    }
  },
  async mounted() {
    await this.loadShortcuts();
  }
};
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

  .shortcuts-search {
    font-family: inherit;
    font-size: inherit;
    width: 100%;
    padding: .25rem;
  }

  .no-shortcuts-config {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    pre {
      display: inline;
    }
  }
}
</style>
