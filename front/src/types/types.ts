/**
 * @author joseph415
 */

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
  setIsModalOpen: (
    valOrUpdater: ((currVal: boolean) => boolean) | boolean,
  ) => void;
}
