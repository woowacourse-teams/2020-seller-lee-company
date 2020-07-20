export interface Tag {
  id: number;
  tag: string;
}

export interface TagItemProps {
  tag: Tag;
  onRemove: Function;
}

export interface TagModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
}
