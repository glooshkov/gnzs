<script setup lang="ts">
import {defineProps, ref} from 'vue';


interface CreateEntity {
  label: string,
  value: string,
  id: number
}

const props = defineProps<{
  store: any,
}>();

const storeEnt = ref<CreateEntity[]>(props.store.entities)
</script>

<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Имя сущности</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entity, index) in storeEnt" :key="index">
          <td>{{ entity.label }}</td>
          <td>{{ entity.id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 10px;
  order-radius: 20px;
}

.table {
  width: 100%;
  border-collapse: unset;
  border-spacing: 4px 7px;
  text-align: center;
  border-radius: 20px;
  font-family: Arial, sans-serif;
}

th, td {
  padding: 10px;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
}

thead {
  background-color: rgb(197, 195, 238);
  position: sticky;
  top: 0;
  z-index: 1;
}

tbody tr:nth-child(even) {
  background-color: var(--color-white);
}
tbody tr:hover {
  background-color: rgba(106, 108, 111, 0.1);
}
</style>