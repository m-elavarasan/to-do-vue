<template>
  <div class="container-title">
    <h1>Drag and Drop To-Do List</h1>
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
        <div class="card-list">
          <Card v-for="task in tasks.filter(task => task.status === 'created')" :key="task.id" :title="task.title"
            :description="task.description" :status="task.status" @dragstart="onDragStart(task)" draggable="true" />
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
        <div class="card-list">
          <Card v-for="task in tasks.filter(task => task.status === 'started')" :key="task.id" :title="task.title"
            :description="task.description" :status="task.status" @dragstart="onDragStart(task)" draggable="true" />
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
        <div class="card-list">
          <Card v-for="task in tasks.filter(task => task.status === 'completed')" :key="task.id" :title="task.title"
            :description="task.description" :status="task.status" @dragstart="onDragStart(task)" draggable="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/CardComp.vue'; 
export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description for Task 1',
          status: 'created'
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description for Task 2',
          status: 'created'
        },
        {
          id: 3,
          title: 'Task 3',
          description: 'Description for Task 3',
          status: 'started'
        },
        {
          id: 4,
          title: 'Task 4',
          description: 'Description for Task 4',
         
          status: 'completed'
        }
      ],
      draggedTask: null // To keep track of the dragged task
    };
  },
  components: {
    Card
  },
  methods: {
    onDragStart(task) {
      // Set the dragged task when a card is dragged
      this.draggedTask = task;
    },
    onDrop(status) {
      // Update the status of the dragged task when it's dropped into a different column
      if (this.draggedTask) {
        this.draggedTask.status = status;
        this.draggedTask = null; // Reset the dragged task
      }
    }
  }
};
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
}</style>
