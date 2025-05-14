<template>
  <div id="app">
    <div class="background-container" :class="{ 'blur-background': showModal }">
      <div class="top-container">
        <h1 class="title">To do list</h1>
        <button class="add-button" @click="showModal = true"><img src="/plus.svg"></button>
    </div>
    <SearchAndSort v-model:search="searchText" v-model:sort="sortType" />
    <div class="table-header">
        <div class="header-cell checkbox"></div>
        <div class="header-cell description">Описание</div>
        <div class="header-cell status">Статус</div>
        <div class="header-cell date">Дата</div>
    </div>
    <TodoList :tasks="sortedTasks" />

    </div>
    
  
    <AddTaskModal v-if="showModal" @close="showModal = false" @add-task="addTask" />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import TodoList from './components/TodoList.vue'
import SearchAndSort from './components/SearchAndSort.vue'
import AddTaskModal from './components/AddTaskModal.vue'

const tasks = ref([])
const searchText = ref('')
const sortType = ref('date')
const showModal = ref(false)

watchEffect(() => {
  const saved = localStorage.getItem('tasks')
  if (saved) {
    tasks.value = JSON.parse(saved)
  }
})

watchEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
})

const filteredTasks = computed(() => {
  return tasks.value.filter(task =>
    task.description.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

const sortedTasks = computed(() => {
  let arr = [...filteredTasks.value]
  if (sortType.value === 'date') {
    return arr.sort((a, b) => new Date(a.date) - new Date(b.date))
  } else if (sortType.value === 'status') {
    return arr.sort((a, b) => a.completed - b.completed)
  }
  return arr
})

function addTask(task) {
  tasks.value.push(task)
}
</script>

<style scoped>
#app {
  max-width: 1300px;
  margin: auto;
  padding: 20px;
  min-height: 700px;
}

.background-container {
  position: relative;
}

.blur-background {
  filter: blur(2px);
  pointer-events: none;
}

.blur-background * {
  pointer-events: auto;
}

.top-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  background-color: #D6DBEB;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
}

.title {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 700;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.table-header {
  display: flex;
}

.header-cell {
  text-align: left;
  padding-left: 20px;
  font-family: 'Vela Sans';
  font-size: 14px;
  font-weight: 400;
}

.checkbox {
  width: 90px;    
}

.description {
    width: 900px;
    border-left: 1px solid #C4C4C4;   
}

.status {
    width: 151px;
    border-left: 1px solid #C4C4C4; 
}

.date {
    width: 70px;
    border-left: 1px solid #C4C4C4;
}
</style>