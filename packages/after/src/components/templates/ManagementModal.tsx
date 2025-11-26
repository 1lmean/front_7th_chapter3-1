import { useManagementTab } from "@/hooks/useManagementTab";
import { PostForm } from "../PostForm";
import { UserForm } from "../UserForm";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

type Entity = User | Post;

interface ManagementModalProps {
  isOpen: boolean;
  selectedItem: Entity | null; // null = create, Entity = edit
  onClose: () => void;
}

export const ManagementModal = ({
  isOpen,
  selectedItem,
  onClose,
}: ManagementModalProps) => {
  const { entityType } = useManagementTab();
  const isEditMode = selectedItem !== null;

  const title = isEditMode
    ? `${entityType === "user" ? "사용자" : "게시글"} 수정`
    : `새 ${entityType === "user" ? "사용자" : "게시글"} 만들기`;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-large"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {entityType === "user" ? (
          <UserForm data={selectedItem as User | null} onCancel={onClose} />
        ) : (
          <PostForm data={selectedItem as Post | null} onCancel={onClose} />
        )}
      </div>
    </div>
  );
};
