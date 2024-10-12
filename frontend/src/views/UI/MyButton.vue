<script setup lang="ts">
import {computed, defineProps} from "vue";

const props = defineProps<{
  isDisabled: boolean,
}>();

const styleBtn = computed(()=>{return props.isDisabled? 'btn-active':'btn-disabled' })
</script>

<template>
  <button class="btn" :disabled="!props.isDisabled" :class="styleBtn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 15px;
  border-radius: 7px;
  border: none;
  width: 300px;
  height: 45px;
  font-family: Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 2px;
  outline: none;
  outline-offset: 2px;
  background-color: var(--color-btn);
  color: var(--color-white);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn:disabled:hover {
  background-color: var(--color-white);
}

.btn:disabled {
  background-color: var(--color-white);
  color: var(--color-grey);
  cursor: default;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.btn:hover {
  background-color: var(--color-btn-h);
}

.btn:focus-visible {
  outline-offset: 2px;
}
</style>


