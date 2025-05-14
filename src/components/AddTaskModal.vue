<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Создать новую задачу</h2>
        <button class="close-button" @click="$emit('close')">
          &times;
        </button>
      </div>

      <div class="modal-body">
        <label>
          Описание
          <input v-model="description" placeholder="Введите описание" />
        </label>
      </div>

      <div class="actions">
        <button @click="save">Создать</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const description = ref('')
const completed = ref(false)
const date = ref(new Date().toISOString().split('T')[0])

const emit = defineEmits(['add-task', 'close'])

function save() {
  if (!description.value.trim()) return

  const task = {
    description: description.value,
    completed: completed.value,
    date: date.value
  }

  emit('add-task', task)
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 40px;
  border-radius: 8px;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 30px 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  background-color: #314B99;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

.modal-body label {
  display: block;
  margin-bottom: 10px;
  font-family: 'Vela Sans';
}

.modal-body input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
  font-family: 'Vela Sans';
}

.actions {
  margin-top: 15px;
  text-align: center;
}

.actions button {
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background-color: #F0F5FF;
  color: #314B99;

}
</style>