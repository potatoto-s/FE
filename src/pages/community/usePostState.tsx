import { useRef, useState } from 'react';
import { initFormData, initError } from '@pages/community/CommunityPostConst';
import type {
  FormData,
  FormType,
  ErrorState,
} from '@pages/community/CommunityPostTypes';

function useCommunityPostState({ type }: { type: FormType }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>(initFormData);
  const [error, setError] = useState<ErrorState>(initError);
  const [pageType, setPageType] = useState<FormType>(type);
  const [imageInputResetKey, setImageInputResetKey] = useState(Date.now());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return {
    fileInputRef,
    formData,
    setFormData,
    error,
    setError,
    pageType,
    setPageType,
    imageInputResetKey,
    setImageInputResetKey,
    showDeleteModal,
    setShowDeleteModal,
  };
}

export default useCommunityPostState;
