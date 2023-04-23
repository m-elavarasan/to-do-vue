<template>
    <div class="todo-app">
        <div class="todo-list">
            <h2 class="list-title">To-Do</h2>
            <div class="card-list" @dragover.prevent @drop="onDrop">
                <Card v-for="task in todoTasks" :key="task.id" :title="task.title" :description="task.description"
                    @dragstart="onDragStart(task)" draggable="true" />
            </div>
        </div>
        <div class="completed-list">
            <h2 class="list-title">Completed</h2>
            <div class="card-list" @dragover.prevent @drop="onDrop">
                <Card v-for="task in completedTasks" :key="task.id" :title="task.title" :description="task.description"
                    @dragstart="onDragStart(task)" draggable="true" />
            </div>
        </div>
    </div>
</template>
  
<script>
import Card from '../components/CardComp.vue';

export default {
    components: {
        Card
    },
    data() {
        return {
            todoTasks: [
                { id: 1, title: 'Task 1', description: 'Description 1', status:'completed' },
                { id: 2, title: 'Task 2', description: 'Description 2',status:'completed' },
                { id: 3, title: 'Task 3', description: 'Description 3',status:'completed' }
            ],
            completedTasks: []
        };
    },
    methods: {
        onDragStart(task) {
            // Set the task data as JSON in the data transfer
            event.dataTransfer.setData('task', JSON.stringify(task));
        },
        onDrop(event) {
            event.preventDefault(); // Prevent the default behavior
            // Get the dragged task data from data transfer
            const taskData = JSON.parse(event.dataTransfer.getData('task'));
                // Update the status of the dropped task to "Completed"
                taskData.status = 'Completed';
                // Add the dropped task to the completed tasks list
                this.completedTasks.push(taskData);
                // Remove the dropped task from the todo tasks list
                this.todoTasks = this.todoTasks.filter(task => task.title !== taskData.title);
            }
        }
    }
</script>
  
<style scoped>
.todo-app {
    display: flex;
    justify-content: center;
}

.todo-list,
.completed-list {
    width: 200px;
    padding: 1rem;
}

.list-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.card-list {
    min-height: 200px;
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 4px;
}

.card {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.title {
    font-size: 1.2rem;
    font-weight: bold;
}

.description {
    margin-top: 0.5rem;
    color: #777;
}
</style>
  