export interface Author {
  id: number;
  nickname: string;
  role: string;
  companyName?: string;
  workshopName?: string;
}

export interface Comment {
  id: number;
  content: string;
  status: string;
  created_at: string;
  is_deleted: boolean;
  author: Author;
  post: number;
  user: number;
  workshopName?: string;
  companyName?: string;
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
  currentUser: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
