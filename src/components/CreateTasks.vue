<template>
  <Dialog v-model:visible="localShowModal" @hide="onHide" draggable  header="Create New" :style="{ width: '50vw'}">
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
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { mapActions} from 'vuex';
import firestoreService from "@/services/toDoService";
export default {
  components: {
    InputText,
    Button,
    Dialog
  },
  data() {
    return {
      localShowModal: this.showModal,
      tasks: {
        id: "",
        title: "",
        description: "",
        status: "created",
        email:"",
        date: ""
      }
    }
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    }
  },
  computed:{
    userData(){
      return JSON.parse(localStorage.getItem("user"));
    },
    isValid(){
      if(this.tasks.title === "" && this.tasks.description === ""){
          return false;
        }
      return true;
    }
  },
  methods: {
    ...mapActions(['fetchTasks']),
    handleCreate() {
      this.tasks.date = new Date();
      this.tasks.email = this.userData.email
      this.onCreateTasks(this.tasks)
    },
    handleCancel() {
      this.resetTasks()
      this.localShowModal = false;
    },
    resetTasks() {
      this.tasks.title = "",
        this.tasks.description = ""

    },
    onHide() {
      this.localShowModal = false;
      this.$emit('update:showModal', false);
    },
    async onCreateTasks(tasks) {
      if (this.isValid) {
        await firestoreService.postData("tasks", tasks)
          .then(() => {
            this.fetchTasks();
            this.resetTasks()
            this.localShowModal = false;
          })
          .catch(error => {
            console.error("Error updating task in Firestore:", error);
          });
      }
      else {
        console.error("Invalid Input");
      }
    },
  },
  watch: {
    showModal(value) {
      this.localShowModal = value;
    },
  },
}
</script>
<style lang="scss" scoped>
.p-dialog-footer {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
</style>
