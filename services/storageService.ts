
import { Post, AdConfig, SiteSettings } from '../types';
import { INITIAL_POSTS, INITIAL_ADS } from '../constants';

const POSTS_KEY = 'drj_posts';
const ADS_KEY = 'drj_ads';
const SETTINGS_KEY = 'drj_settings';

export const storageService = {
  getPosts: (): Post[] => {
    const data = localStorage.getItem(POSTS_KEY);
    return data ? JSON.parse(data) : INITIAL_POSTS;
  },
  savePost: (post: Post) => {
    const posts = storageService.getPosts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index > -1) {
      posts[index] = post;
    } else {
      posts.unshift(post);
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },
  deletePost: (id: string) => {
    const posts = storageService.getPosts().filter(p => p.id !== id);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },
  getAds: (): AdConfig[] => {
    const data = localStorage.getItem(ADS_KEY);
    return data ? JSON.parse(data) : INITIAL_ADS;
  },
  saveAds: (ads: AdConfig[]) => {
    localStorage.setItem(ADS_KEY, JSON.stringify(ads));
  },
  getSettings: (): SiteSettings => {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : { pushEnabled: false, siteName: 'DeepRest Journal', lastAutoPostDate: '' };
  },
  saveSettings: (settings: SiteSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
};
