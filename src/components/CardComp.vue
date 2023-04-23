<template>
  <Card class="card" draggable="true" @dragstart="onDragStart($event, task)">
    <template #header>
      <span class="card_title">{{ title }}</span>
    </template>
    <template #content>
      <span class="card_body">{{ description }}</span>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
export default {
  components: {
    Card
  },
  props: {
    title: String,
    description: String,
  },
  methods: {
    onDragStart(event) {
      event.dataTransfer.setData("task", JSON.stringify({ title: this.title, description: this.description, status: this.status }));
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative; /* Add position property to make the icon positioned relative to the card */
  margin: 2.5%;
  width: 95%;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  overflow-y: hidden;
  &:hover {
    cursor: move;
  }
  &_title {
    font-size: larger;
    color: var(--black-800);
    font-weight: 600;
  }
  &_body {
    font-size: med;
    color: var(--black-800);
    font-weight: 400;
  }
}
</style>
