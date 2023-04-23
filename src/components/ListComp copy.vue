<template>
  <div class="container-title">
    <h1>Drag and Drop</h1>
  </div>
  <div class="container">
    <div class="container_one" @dragover.prevent @drop="onDrop('created')">
      <span>
        <h2>Created</h2>
      </span>
      <div v-if="tasks.filter(task => task.status === 'created').length === 0" class="container_info">
        <span class="pi pi-plus"> Create New Task</span>
      </div>
      <div v-else class="container_task">
        <div v-for="task in tasks.filter(task => task.status === 'created')" :key="task.id">
          <Card class="container_card" draggable @dragstart="onDragStart(task)">
            <i class="pi pi-grip-vertical" style="margin-right: 5px;"></i> <!-- Drag Icon -->
            <template #header>
              <span class="container_card_title">{{ task.title }}</span>
            </template>
            <template #content>
              <span class="container_card_body">{{ task.description }}</span>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="container_two" @dragover.prevent @drop="onDrop('started')">
      <span>
        <h2>Started</h2>
      </span>
      <div v-if="tasks.filter(task => task.status === 'started').length === 0" class="container_info">
        <span class="pi pi-angle-double-right"> Drag to Start</span>
      </div>
      <div v-else class="container_task">
        <div v-for="task in tasks.filter(task => task.status === 'started')" :key="task.id">
          <Card class="container_card" draggable @dragstart="onDragStart(task)">
            <i class="pi pi-grip-vertical" style="margin-right: 5px;"></i> <!-- Drag Icon -->
            <template #header>
              <span class="container_card_title">{{ task.title }}</span>
            </template>
            <template #content>
              <span class="container_card_body">{{ task.description }}</span>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="container_three" @dragover.prevent @drop="onDrop('completed')">
      <span>
        <h2>Completed</h2>
      </span>
      <div v-if="tasks.filter(task => task.status === 'completed').length === 0" class="container_info">
        <span class="pi pi-angle-double-right"> Drag to Complete </span>
      </div>
      <div v-else class="container_task">
        <div v-for="task in tasks.filter(task => task.status === 'completed')" :key="task.id">
          <Card class="container_card" draggable @dragstart="onDragStart(task)">
            <i class="pi pi-grip-vertical" style="margin-right: 5px;"></i> <!-- Drag Icon -->
            <template #header>
              <span class="container_card_title">{{ task.title }}</span>
            </template>
            <template #content>
              <span class="container_card_body">{{ task.description }}</span>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from 'primevue/card';
export default {
  name: "DragListComp",
  components: {
    Card
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Task 1",
          description: "This is task 1",
          status: "started"
        },
        {
          id: 2,
          title: "Task 2",
          description: "This is task 2",
          status: "started"
        },
        {
          id: 3,
          title: "Task 3",
          description: "This is task 3",
          status: "completed"

        },
        {
          id: 4,
          title: "Task 4",
          description: "This is task 4",
          status: "started"

        },
        {
          id: 5,
          title: "Task 5",
          description: "This is task 5",
          status: "completed"

        },
        {
          id: 6,
          title: "Task 6",
          description: "This is task 6",
          status: "started"

        },
        {
          id: 7,
          title: "Task 7",
          description: "This is task 7",
          status: "created"

        },


      ],
    }
  },
  methods: {
    onDragStart(task, event) {
      event.dataTransfer.setData('text/plain', JSON.stringify(task));
      event.target.classList.add('dragging'); // Add the CSS class to set the custom cursor style
    },
    onDrop(status) {
      const task = JSON.parse(event.dataTransfer.getData('text/plain'));
      task.status = status; // Update the status of the dropped task
      // Perform any other necessary tasks with the dropped task
      event.target.classList.remove('dragging'); // Remove the CSS class to reset the cursor style
    },
    onDragEnd(event) {
      event.target.classList.remove('dragging'); // Remove the CSS class to reset the cursor style
    }
  }
}
</script>

<style lang="scss" scoped>
.container-title {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.container {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &_card {
    .dragging {
      cursor: move;
    }
  }

  &_one {
    background-color: var(--gray-300);
    height: 100%;
    width: 32%;
    float: left;
    margin-right: 15px;
    border: 3.5px dashed var(--green-700);
    overflow: auto;

  }

  &_two {
    background-color: var(--gray-300);
    height: 100%;
    width: 32%;
    float: left;
    margin-right: 15px;
    border: 3.5px dashed var(--red-700);
    overflow: auto;

  }

  &_three {
    background-color: var(--gray-300);
    height: 100%;
    width: 32%;
    float: left;
    margin-right: 15px;
    border: 3.5px dashed var(--purple-700);
    overflow: auto;

  }

  &_info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
  }

  .pi {
    font-size: 1.5rem;
    color: var(--black-800);
  }

  &_task {
    overflow: hidden;
  }

  &_card {
    margin: 2.5%;
    width: 95%;
    border: 1px solid var(--gray-300);
    border-radius: 5px;
    overflow-y: hidden;

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
}</style>