/**
 * @author joseph415
 */

export interface Tag {
  id: number;
  tag: string;
}

export interface TagItemProps {
  tagBox: Tag;
}

export interface TagModalProps {
  isModalOpen: boolean;
}
