import { useManagementTab } from "../hooks/useManagementTab";
import { PostForm } from "./PostForm";
import { UserForm } from "./UserForm";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

type Entity = User | Post;

interface ManagementModalProps {
  isOpen: boolean;
  selectedItem: Entity | null; // null = create, Entity = edit
  onClose: () => void;
}

/**
 * ManagementModal - Controlled Modal Component
 *
 * Props로 isOpen, selectedItem을 받아 렌더링하는 제어 컴포넌트입니다.
 *
 * 📌 설계 결정:
 * - Props 기반 제어: 부모(ManagementPage)가 모달 상태 관리
 * - selectedItem으로 create/edit 모드 판단 (null = create)
 * - Form 컴포넌트가 자체 상태와 submit 로직 보유
 *
 * 🔄 대안 패턴:
 * 1. useModal 훅: const { isOpen, open, close } = useModal()
 *    - 장점: 재사용성, 일관된 API
 *    - 적합: 여러 페이지에서 동일 모달 사용 시
 *
 * 2. Modal Context: <ModalProvider> + useModalContext()
 *    - 장점: 전역 모달 관리, 모달 스택 지원
 *    - 적합: 대규모 서비스, 복잡한 모달 흐름
 *
 * 현재는 단일 페이지 사용으로 Props 패턴이 적합하나,
 * 확장 시 useModal 훅 분리를 권장합니다.
 */
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
