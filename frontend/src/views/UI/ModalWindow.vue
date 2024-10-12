<script lang="ts" setup>
import {defineProps, onMounted, ref} from 'vue';
  import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline/index.js";

  let timer1: number;
  let timer2: number;

  const toast = ref<HTMLElement>();
  const closeIcon = ref<HTMLElement>();
  const progress = ref<HTMLElement>();

  const props = defineProps<{
    entity: Entity,
  }>();

  onMounted(() => {
    toast.value = document.querySelector(".toast");
    closeIcon.value = document.querySelector(".close");
    progress.value = document.querySelector(".progress");
  });

  function showToast() {
    if (toast.value && closeIcon.value && progress.value) {
      toast.value.classList.add("active");
      progress.value.classList.add("active");

      timer1 = window.setTimeout(() => {
        toast.value.classList.remove("active");
      }, 3000);

      timer2 = window.setTimeout(() => {
        progress.value.classList.remove("active");
      }, 3300);
    }
  }

  function closeToast() {
    if (toast.value && closeIcon.value && progress.value) {
      toast.value.classList.remove("active");

      setTimeout(() => {
        progress.value.classList.remove("active");
      }, 300);

      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }

  defineExpose({
    showToast,
  });
</script>

<template>
  <div class="toast">
    <div class="toast-content">
      <CheckIcon class="check"/>

      <div class="message">
        <span class="text text-1">Success</span>
        <span class="text text-2">{{ props.entity.label }} успешно создан(а)</span>
      </div>
    </div>
    <XMarkIcon class="close" @click="closeToast"/>

    <div class="progress"></div>
  </div>
</template>

<style scoped>
.toast {
  position: absolute;
  top: 25px;
  right: 30px;
  border-radius: 12px;
  background: #fff;
  padding: 20px 35px 20px 25px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateX(calc(100% + 30px));
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
}

.toast.active {
  transform: translateX(0%);
}

.toast .toast-content {
  display: flex;
  align-items: center;
}

.toast-content .check {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  min-width: 35px;
  padding: 5px;
  background-color: var(--color-toast);
  color: #fff;
  font-size: 20px;
  border-radius: 50%;
}

.toast-content .message {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}

.message .text {
  font-size: 16px;
  font-weight: 400;
  color: var(--color-grey);
}

.message .text.text-1 {
  font-weight: 600;
  color: #333;
}

.toast .close {
  position: absolute;
  top: 10px;
  right: 15px;
  width: 30px;
  aspect-ratio: 1;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
}

.toast .close:hover {
  opacity: 1;
}

.toast .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
}

.toast .progress:before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: var(--color-toast);
}

.progress.active:before {
  animation: progress 3s linear forwards;
}

@keyframes progress {
  100% {
    right: 100%;
  }
}
</style>