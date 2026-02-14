
export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  altText: string;
}

export enum Category {
  INSOMNIA = 'Insomnia',
  HYGIENE = 'Sleep Hygiene',
  ANXIETY = 'Anxiety & Sleep',
  RECOVERY = 'Recovery',
  CLARITY = 'Mental Clarity'
}

export interface AdConfig {
  id: string;
  placement: string;
  code: string;
  active: boolean;
}

export interface SiteSettings {
  pushEnabled: boolean;
  siteName: string;
  lastAutoPostDate: string;
}
