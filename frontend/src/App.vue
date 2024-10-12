<script setup lang="ts">
  import {computed, ref} from "vue";
  import {switchParamsGlobal, entities} from '@/stores/global'
  import MyButton from "@/views/UI/MyButton.vue";
  import { useEntityStore } from "@/stores/store";
  import axios, { type AxiosResponse } from 'axios';
  import SelectButton from "@/views/UI/SelectButton.vue";
  import ResultWindow from "@/views/UI/ResultWindow.vue";
  import ModalWindow from "@/views/UI/ModalWindow.vue";


  interface Some extends Event {
    selected:Entity
  };

  interface Component {
    entity: Entity
  };

  interface CreateEntity extends Entity{
    id: number
  };

  // comp - имя компонента, создан для select-button - переиспользовать в других компонентах
  const comp: string = 'home';
  const placeholder_entity: Entity = {label: 'Не выбрано', value: 'unselected'};
  //здесь хранится объект сущности
  const home = ref<Component>({ entity: placeholder_entity });
  let loader = ref<boolean>(false);
  let entityStore = useEntityStore();

  // для компонента уведомления
  const toastRef = ref<{ showToast: () => void } | null>(null);

  function triggerToast() {
    toastRef.value?.showToast();
  }

  //обновление выбранной сущности в select-button
  const handleUpdate = (event: Some, element: HTMLElement, comp: string) => {
    const name: string = element.id;
    const selected: Entity = event.selected;
    switchParamsGlobal(selected, name, comp, this as any);
  };

  // блокиратор кнопки
  const isDis: boolean = computed(() => {
    return !!(home.value.entity && home.value.entity.value !== 'unselected' && !loader.value);
  });

  // для таблицы сущностей
  const showTable: boolean = computed(() => {
    return !!(entityStore.getEntity.length > 0)
  });

  const createEntity = async (entity: Entity) => {
    try {
      loader.value = true;
      const response: AxiosResponse<ServerResponse> = await axios.post('http://localhost:3000/amo-crm/create-entity', {
        entityType: home.value.entity.value,
        data: [{
          name: home.value.entity.label,
        }],
      });
      const entityId = response.data.id;
      const newEntity: CreateEntity = {
        ...entity,
        id: entityId
      };
      entityStore.addEntity(newEntity);
      triggerToast();
    } catch (error) {
      console.error('Ошибка при создании сущности:', error);
    } finally {
      loader.value = false
    }
  };
</script>

<template>
  <SelectButton
    id="entity"
    style="margin-top: 1rem; width: 300px"
    class="select-inp"
    v-model="home.entity"
    :options="entities"
    :initialSelected="placeholder_entity"
    @update="handleUpdate($event as Some, $event.target as HTMLElement, comp)"
  />
  <my-button
    type="button"
    :isDisabled="isDis"
    style="margin-top: 10px"
    @click="createEntity(home.entity)"
  >
    <span v-show="!loader">СОЗДАТЬ</span>
    <svg
      class="container"
      viewBox="0 0 40 40"
      height="40"
      width="40"
      v-show="loader"
    >
      <circle
        class="track"
        cx="20"
        cy="20"
        r="17.5"
        pathlength="100"
        stroke-width="5px"
        fill="none"
      />
      <circle
        class="car"
        cx="20"
        cy="20"
        r="17.5"
        pathlength="100"
        stroke-width="5px"
        fill="none"
      />
    </svg>
  </my-button>
  <transition name="child2" :duration="{ enter: 500, leave: 300 }">
    <ResultWindow class="my-table" v-show="showTable" :store="entityStore"/>
  </transition>

  <ModalWindow :entity="home.entity" ref="toastRef"></ModalWindow>
</template>

<style scoped>

</style>
