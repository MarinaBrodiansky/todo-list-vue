<template>
  <div class="search-sort">
    <div>
    <img src="/search.svg">
    <input v-model="search" placeholder="Поиск Имени, статуса или даты"/>
    </div>
    <div>
      <span>Сортировать по</span>
      <select v-model="sort">
      <option value="date">Дата</option>
      <option value="status">Статус</option>
    </select>

    </div>


  </div>
</template>

<script setup>
import { defineModel } from 'vue'

const search = defineModel('search')
const sort = defineModel('sort')
</script>

<style scoped>
.search-sort {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}
input, select {
  padding: 8px;
  font-size: 14px;
  border: none;
}

</style>