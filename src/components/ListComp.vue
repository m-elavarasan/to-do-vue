<template>
  <div class="container-title">
    <h1>Drag and Drop To-Do List </h1>
  </div>
  <div class="container">
    <div class="container_one" @dragover.prevent @drop="onDrop('created')">
      <span><h2>Created</h2></span>
      <div v-if="this.getTasks?.filter(task => task.status === 'created').length === 0" class="container_info">
        <Button icon="pi pi-plus" label="Create New" @click="showModal = true" />
      </div>
      <div v-else class="container_task">
        <div class="card-list">
          <Card v-for="task in this.getTasks?.filter(task => task.status === 'created')" :key="task.id"
            :title="task.title" :description="task.description" :status="task.status" @dragstart="onDragStart(task)"
            draggable="true" :class="getStatusClass(task.status)" />
        </div>
      </div>

    </div>
    <div class="container_two" @dragover.prevent @drop="onDrop('inprogress')">
      <span>
        <h2>In Progress</h2>
      </span>
      <div v-if="this.getTasks?.filter(task => task.status === 'inprogress').length === 0" class="container_info">
        <span class="pi pi-angle-double-right"> Drag to Start</span>
      </div>
      <div v-else class="container_task">
        <div class="card-list">
          <Card v-for="task in this.getTasks?.filter(task => task.status === 'inprogress')" :key="task.id"
            :title="task.title" :description="task.description" :status="task.status" @dragstart="onDragStart(task)"
            draggable="true" :class="getStatusClass(task.status)" />
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
            draggable="true" :class="getStatusClass(task.status)" />
        </div>
      </div>
    </div>
    <CreateTasksVue :show-modal="showModal" @update:show-modal="showModal = $event"/>
  </div>
</template>

<script>
import Card from '../components/CardComp.vue';
import Button from 'primevue/button';
import { mapActions, mapGetters } from 'vuex';
import firestoreService from "@/services/toDoService";
import CreateTasksVue from './CreateTasks.vue';

export default {
  data() {
    return {
      draggedTask: null,
      showModal: false,
    };
  },
  components: {
    Card,
    CreateTasksVue,
    Button
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    ...mapGetters(['getTasks']),
    userData(){
      return JSON.parse(localStorage.getItem("user"));
    }
  },
  methods: {
    ...mapActions(['fetchTasks', 'updateTask']),
    onDragStart(task) {
      this.draggedTask = task;
    },
    async onDrop(status) {
      if (this.draggedTask) {
        this.draggedTask.status = status;
        await firestoreService.updateData("tasks", this.draggedTask.id, this.draggedTask)
          .then(() => {
            this.draggedTask = null;

          })
          .catch(error => {
            console.error("Error updating task in Firestore:", error);
          });
      }
    },
    getStatusClass(status) {
      if (status === 'created') {
        return 'card-created'
      } else if (status === 'inprogress') {
        return 'card-in-progress'
      } else if (status === 'completed') {
        return 'card-completed'
      } else {
        return ''
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.container-title {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
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
}
.card-created {
  background: #f3a6836b;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.card-in-progress {
  background: #63ccda7c;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.card-completed {
  background: #cf6a8786;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}


</style>
