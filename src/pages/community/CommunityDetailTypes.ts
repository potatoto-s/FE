export interface Author {
  id: number;
  nickname?: string;
  role: string;
  company_name?: string;
  workshop_name?: string;
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  author: Author;
  workshop_name?: string;
  company_name?: string;
}

export interface Image {
  id: number;
  image_url: string;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  author: Author;
  comments: Comment[];
  created_at: string;
  is_liked: boolean;
  images: Image[];
}

export interface CommentListProps {
  comments: Comment[];
  currentUserId: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
