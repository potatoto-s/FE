export type FormType = 'post' | 'edit';

export type FormData = {
  category: string;
  title: string;
  content: string;
  images: File[] | null; // image는 null 또는 File 타입
};

export type ErrorState = {
  category: string | null;
  content: string | null;
  image: string | null | undefined;
};
