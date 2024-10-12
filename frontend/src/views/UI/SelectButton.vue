<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'
  import {CheckIcon, ChevronUpDownIcon} from "@heroicons/vue/20/solid/index.js";
  import { defineProps } from 'vue'

  interface Entity {
    value: string,
    label: string
  }

  interface Some extends Event {
    selected:Entity
  }
  const props = defineProps<{
    options: Entity[],
    initialSelected: Entity,
  }>();

  const emit = defineEmits<{
    (event: 'update', payload: Some): void;
  }>();

  function switchParams() {
    const eventPayload: Some = {
      selected: selected.value,
      bubbles: true,
      cancelable: true,
      composed: true,
    } as Some;

    emit('update', eventPayload);
  }
  const selected = ref<Entity>(props.initialSelected);
</script>

<template>
  <Listbox as="div" class="list" v-model="selected" @click="switchParams">
    <div style="position: relative;" >
      <ListboxButton class="custom-input" >
        <span class="flex-container">
          <span class="truncated-text">{{ selected.label }}</span>
        </span>
        <span  class="custom-class">
          <ChevronUpDownIcon class="icon1" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition class="transition-container">
        <ListboxOptions class="dropdown">
          <ListboxOption
            as="template"
            v-for="option in options"
            :key="option.value"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li :class="[active ? 'active-styles1' : 'inactive-styles1', 'common-styles1']">
              <ul class="custom-class2">
                <span :class="[selected ? 'active-styles2' : 'inactive-styles2', 'common-styles2']">{{ option.label }}</span>
              </ul>
              <ul v-if="selected" :class="[active ? 'active-styles3' : 'inactive-styles3', 'common-styles3']">
                <CheckIcon class="icon1" aria-hidden="true" />
              </ul>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<style scoped>
.custom-input {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 9px 7px 9px 15px;
  text-align: left;
  color: var(--color-grey);
  font-size: 0.875rem;
  line-height: 1.2;
  font-family: Arial, sans-serif;
  transition: box-shadow 0.3s, border-color 0.3s;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  outline: none;
  background-color: var(--color-white);
  cursor: pointer;
}
.custom-input:hover  {
  outline: none;
  border-color: var(--color-white);
  box-shadow: 0 0 5px 1px rgba(123, 115, 205, 0.58);
}

@media (max-width: 640px) {
  .custom-input {
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

.flex-container {
  display: flex;
  align-items: center;
  margin-left: -14px;
}

.truncated-text {
  display: block;
  margin-left: 0.75rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.custom-class {
  display: flex;
  align-items: center;
  margin-right: -5px;
  margin-left: 0.5rem;
  padding-right: 0.5rem;
  pointer-events: none;
}

.icon1 {
  height: 1.25rem;
  width: 1.25rem;
  color: rgba(123, 115, 205, 0.37);
}

.transition-container {
  transition: 0.1s ease-in-out;
}

.transition-container.leave-from-class {
  opacity: 1;
}

.transition-container.leave-to-class {
  opacity: 0;
}

.dropdown {
  position: absolute;
  z-index: 10;
  margin-top: 0.25rem;
  padding: 5px 0;
  max-height: 200px;
  width: 100%;
  overflow: auto;
  border-radius: 7px;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: var(--color-grey);
  font-family: "MS Sans Serif", sans-serif;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.12);
  background-color: var(--color-white);
  transition: box-shadow 0.3s, border-color 0.3s;
}

.dropdown:hover {
  box-shadow: 0 4px 6px -1px rgba(123, 115, 205, 0.3), 0 2px 4px -1px rgba(123, 115, 205, 0.3);
  outline: none;
}

.dropdown:focus {
  outline: none;
}

.common-styles1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 5px 20px;
  user-select: none;
}
.active-styles1 {
  background-color: rgba(136, 127, 229, 0.25);
  color: #6a6c6f;
}
.inactive-styles1 {
  color: #747579;
}

.custom-class2 {
  display: flex;
  align-items: center;
  margin-left: -20px;
  padding-left: 20px;
}

.common-styles2 {
  display: block;
  margin-left: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.active-styles2 {
  font-weight: 600;
  color: var(--color-grey);
}
.inactive-styles2 {
  font-weight: 400;
}


.common-styles3 {
  display: flex;
  align-items: center;
  margin-right: -10px;
}
.active-styles3 {
  color: var(--color-white);
}
.inactive-styles3 {
  color: var(--color-white);
}
</style>