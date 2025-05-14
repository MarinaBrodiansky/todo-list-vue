<template>
  <div class="task-list">
    <TodoItem v-for="(task, index) in tasks" :key="index" :task="task" />
  </div>
</template>

<script setup>
import TodoItem from './ToDoItem.vue'
defineProps(['tasks'])
</script>

<style scoped>
.task-list {
  margin-top: 10px;
  max-width: 1300px;
}
</style>