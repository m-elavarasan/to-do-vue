<template>
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
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
    export default {
        components: {
    InputText,
    Button
  },
    }
</script>

<style lang="scss" scoped>

</style>