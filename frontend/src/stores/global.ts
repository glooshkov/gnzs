interface Entity {
  label: string,
  value: string
}

export const entities : Entity[] = [
    {label: 'Не выбрано', value: 'unselected'},
    {label: 'Сделка', value: 'leads'},
    {label: 'Контакт', value: 'contacts'},
    {label: 'Компания', value: 'companies'},
];

type UpdateMap = {
  [key: string]: any
};

export function switchParamsGlobal (
    selected: Entity,
    name: string,
    comp: string,
    componentContext: any
): void {
  const updateMap: UpdateMap = {
    entity: { entity: selected },
  };

  componentContext[comp] = {
    ...componentContext[comp],
    ...updateMap[name],
  };
}
