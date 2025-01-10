import { useRef, useState } from 'react';
import { initFormData, initError } from './const';
import type { FormData, FormType, ErrorState } from './type';

function useCommunityPostState({ type }: { type: FormType }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>(initFormData);
  const [error, setError] = useState<ErrorState>(initError);
  const [pageType, setPageType] = useState<FormType>(type);
  const [files, setFiles] = useState<File[]>([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return {
    fileInputRef,
    formData,
    setFormData,
    error,
    setError,
    pageType,
    setPageType,
    files,
    setFiles,
    fileInputKey,
    setFileInputKey,
    isLoading,
    setIsLoading,
    showDeleteModal,
    setShowDeleteModal,
  };
}

export default useCommunityPostState;
