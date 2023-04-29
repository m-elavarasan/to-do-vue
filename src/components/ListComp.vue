<template>
  <div class="container-title">
    <h1>Drag and Drop To-Do List </h1>
  </div>
  <div class="container">
    <div class="container_one" @dragover.prevent @drop="onDrop('created')">
      <span><h2>Created</h2></span>
      <div v-if="this.getTasks?.filter(task => task.status === 'created').length === 0" class="container_info">
        <Button icon="pi pi-plus" label="Create New" @click="visible = true" />
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
    <Dialog v-model:visible="visible" header="Create New" :style="{ width: '50vw' }">
      <div class="p-fluid">
        <div class="p-field p-grid">
          <label for="title" class="p-col-fixed p-mb-2">Title</label>
          <div class="p-col">
            <InputText id="title" v-model="tasks.title" />
          </div>
        </div>
        <div class="p-field p-grid">
          <label for="description" class="p-col-fixed p-mt-2">Description</label>
          <div class="p-col">
            <InputText id="description" v-model="tasks.description" />
          </div>
        </div>
      </div>
      <div class="p-dialog-footer">
        <Button label="Create" icon="pi pi-check" @click="handleCreate" />
        <Button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="handleCancel" />
      </div>
    </Dialog>
  </div>
</template>

<script>
import Card from '../components/CardComp.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { mapActions, mapGetters } from 'vuex';
import firestoreService from "@/services/toDoService";

export default {
  data() {
    return {
      tasks:
      {
        id:"",
        title: "",
        description: "",
        status: "created",
      },
      draggedTask: null,
      visible: false,
    };
  },
  components: {
    Card,
    Dialog,
    InputText,
    Button
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    ...mapGetters(['getTasks']),
    isValid(){
      if(this.tasks.title === "" && this.tasks.description === ""){
          return false;
        }
      return true;
    }
  },
  methods: {
    ...mapActions(['fetchTasks', 'updateTask']),
    onDragStart(task) {
      this.draggedTask = task;
    },
    handleCreate() {
      this.onCreateTasks(this.tasks)

    },
    handleCancel() {
      this.resetTasks()
      this.visible = false;
    },
    resetTasks() {
      this.tasks.title = "",
        this.tasks.description = ""
    },
    async onCreateTasks(tasks) {
      if (this.isValid) {
        await firestoreService.postData("tasks", tasks)
          .then(() => {
            this.fetchTasks();
            console.log("Task updated successfully!");
            this.resetTasks()
            this.visible = false;
          })
          .catch(error => {
            console.error("Error updating task in Firestore:", error);
          });
      }
      else{
        console.error("Invalid Input");
      }
    },
    async onDrop(status) {
      if (this.draggedTask) {
        this.draggedTask.status = status;
        await firestoreService.updateData("tasks", this.draggedTask.id, this.draggedTask)
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

.p-dialog-footer {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
</style>
