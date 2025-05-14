<template>
  <div class="task-item">
    <div class="cell checkbox">
      <label class="custom-checkbox">
        <input type="checkbox" v-model="task.completed" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="cell description">
      {{ task.description }}
    </div>
    <div class="cell status">
      {{ task.completed ? 'Выполнено' : 'В работе' }}
    </div>
    <div class="cell date">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps(['task'])

const formattedDate = computed(() => {
  const date = new Date(props.task.date)
  return date.toLocaleDateString('ru-RU')
})
</script>

<style scoped>
.task-item {
  max-width: 1300px;
  display: flex;
  align-items: center;
  padding: 10px 0;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.task-item:hover {
  background-color: #F6F9FF;
  box-shadow: 0px 4px 4px 0px #00000040;
  cursor: pointer;
}

.cell {
  text-align: left;
  padding-left: 20px;
  font-family: 'Vela Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
}

.checkbox {
  width: 90px;
}

.description {
  width: 900px;
}

.status {
  width: 151px;
  color: v-bind("task.completed ? '#134EC1' : '#F89B11'");
  font-weight: 500;
}

.date {
  padding-left: 20px;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.custom-checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #C4C4C4;
  border-radius: 50%;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.custom-checkbox input:checked ~ .checkmark {
  border-color: #134EC1;
}

.checkmark::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-image: url('/done.svg');
  background-size: contain;
  background-repeat: no-repeat;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark::after {
  display: block;
}
</style>