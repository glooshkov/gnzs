import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface CreateEntity extends Entity{
  id: number
}

export const useEntityStore = defineStore('entity', () => {
  const entities = ref<CreateEntity[]>([])

  function addEntity(newEntity: CreateEntity ) {
    const existingEntity = entities.value.find(entity => entity.id === newEntity.id)

    if (!existingEntity) entities.value.push(newEntity)
  }

  function removeProduct(id: number) {
    entities.value = entities.value.filter(entity => entity.id !== id)
  }

  const getEntity = computed(() => entities.value)

  return { entities, addEntity, removeProduct, getEntity }
})
