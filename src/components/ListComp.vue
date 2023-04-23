<template>
  <div class="container-title">
    <h1>Drag and Drop To-Do List </h1>
  </div>
  <div class="container">
    <div class="container_one" @dragover.prevent @drop="onDrop('created')">
      <span>
        <h2>Created</h2>
      </span>
      <div v-if="this.getTasks?.filter(task => task.status === 'created').length === 0" class="container_info">
        <span class="pi pi-plus"> Create New Task</span>
      </div>
      <div v-else class="container_task">
        <div class="card-list">
          <Card v-for="task in this.getTasks?.filter(task => task.status === 'created')" :key="task.id"
            :title="task.title" :description="task.description" :status="task.status" @dragstart="onDragStart(task)"
            draggable="true" />
        </div>
      </div>
    </div>
    <div class="container_two" @dragover.prevent @drop="onDrop('started')">
      <span>
        <h2>Started</h2>
      </span>
      <div v-if="this.getTasks?.filter(task => task.status === 'started').length === 0" class="container_info">
        <span class="pi pi-angle-double-right"> Drag to Start</span>
      </div>
      <div v-else class="container_task">
        <div class="card-list">
          <Card v-for="task in this.getTasks?.filter(task => task.status === 'started')" :key="task.id"
            :title="task.title" :description="task.description" :status="task.status" @dragstart="onDragStart(task)"
            draggable="true" />
        </div>
      </div>
    </div>
    <div class="container_three" @dragover.prevent @drop="onDrop('completed')">
      <span>
        <h2>Completed</h2>
      </span>
      <div v-if="this.getTasks?.filter(task => task.status === 'completed').length === 0" class="container_info">
        <span class="pi pi-angle-double-right"> Drag to Complete </span>
      </div>
      <div v-else class="container_task">
        <div class="card-list">
          <Card v-for="task in this.getTasks?.filter(task => task.status === 'completed')" :key="task.id"
            :title="task.title" :description="task.description" :status="task.status" @dragstart="onDragStart(task)"
            draggable="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/CardComp.vue';
import { mapActions, mapGetters } from 'vuex';
import firestoreService from "@/services/toDoService";

export default {
  data() {
    return {
      tasks: [
        {
          id: 0,
          title: "Test Task",
          description: "Sample task description",
        }
      ],
      draggedTask: null
    };
  },
  components: {
    Card
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    ...mapGetters(['getTasks'])
  },
  methods: {
    ...mapActions(['fetchTasks', 'updateTask']),
    onDragStart(task) {
      this.draggedTask = task;
    },
    async onDrop(status) {
      if (this.draggedTask) {
        this.draggedTask.status = status;
        console.log(this.getTasks);
      await firestoreService.updateData("tasks", this.draggedTask.id,this.draggedTask)
          .then(() => {
            this.draggedTask = null;
            console.log("Task updated successfully!");

          })
          .catch(error => {
            console.error("Error updating task in Firestore:", error);
          });
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
