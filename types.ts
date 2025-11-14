export type WebsiteCategory = '게임' | 'MBTI';

export interface Website {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: WebsiteCategory;
  path: string;
}

export type WebsiteFormData = Omit<Website, 'id' | 'imageUrl'>;
