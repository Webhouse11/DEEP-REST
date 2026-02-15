
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post, AdConfig, Category } from '../types';
import { TrendingUp, ChevronRight, Clock } from 'lucide-react';
import { AdSlot } from '../App';

interface HomeProps {
  posts: Post[];
  ads: AdConfig[];
}

interface PostCardProps {
  post: Post;
  size?: 'small' | 'medium' | 'large';
  badge?: React.ReactNode;
}

const PostCard: React.FC<PostCardProps> = ({ post, size = 'small', badge }) => {
  if (size === 'large') {
    return (
      <Link to={`/article/${post.slug}`} className="group block mb-6">
        <div className="overflow-hidden mb-4 relative aspect-[16/9]">
          <img src={post.imageUrl} alt={post.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-4 left-4 flex items-center">
            <div className="bg-rose-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">{post.category}</div>
            {badge}
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-black serif text-gray-900 leading-tight group-hover:text-rose-600 transition-colors mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">{post.summary}</p>
        <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest gap-4">
          <span>{post.author}</span>
          <span className="flex items-center gap-1"><Clock size={10} /> {new Date(post.date).toLocaleDateString()}</span>
        </div>
      </Link>
    );
  }

  if (size === 'medium') {
    return (
      <Link to={`/article/${post.slug}`} className="group flex flex-col md:flex-row gap-4 mb-6 border-b border-gray-100 pb-6">
        <div className="w-full md:w-1/3 aspect-[4/3] overflow-hidden">
          <img src={post.imageUrl} alt={post.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="w-full md:w-2/3">
           <div className="flex items-center gap-2 mb-1">
             <div className="text-rose-600 text-[10px] font-bold uppercase">{post.category}</div>
             {badge}
           </div>
           <h3 className="text-xl font-bold serif leading-tight mb-2 group-hover:text-rose-600">{post.title}</h3>
           <p className="text-gray-500 text-xs line-clamp-2 mb-2">{post.summary}</p>
           <div className="text-[10px] text-gray-400 font-bold uppercase">{new Date(post.date).toLocaleDateString()}</div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${post.slug}`} className="group flex gap-3 mb-4 pb-4 border-b border-gray-100 last:border-0">
      <div className="w-24 h-16 flex-shrink-0 overflow-hidden">
        <img src={post.imageUrl} alt={post.altText} className="w-full h-full object-cover group-hover:opacity-80 transition" />
      </div>
      <div>
        <h4 className="text-sm font-bold leading-tight group-hover:text-rose-600 line-clamp-2">{post.title}</h4>
        <div className="text-[9px] text-gray-400 font-bold uppercase mt-1">{new Date(post.date).toLocaleDateString()}</div>
      </div>
    </Link>
  );
};

const Home: React.FC<HomeProps> = ({ posts, ads }) => {
  const { cat } = useParams();
  
  const filteredPosts = cat 
    ? posts.filter(p => p.category.toLowerCase().replace(/ /g, '-') === cat)
    : posts;

  const featured = filteredPosts[0];
  const latestRow1 = filteredPosts.slice(1, 3);
  const latestRow2 = filteredPosts.slice(3, 5);
  const trending = posts.slice(0, 8);
  
  const sidebarAd = ads.find(a => a.id === 'sidebar-rect');
  const tenancyAd = ads.find(a => a.id === 'tenancy-rect');
  const interArticleAd = ads.find(a => a.id === 'inter-article');
  const mobileInterArticleAd = ads.find(a => a.id === 'mobile-inter-article');
  const badgeAd = ads.find(a => a.id === 'sponsorship-badge');
  const stickyAd = ads.find(a => a.id === 'sticky-sidebar');

  const Badge = badgeAd?.active ? <AdSlot code={badgeAd.code} active={true} /> : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <div className="border-b-4 border-rose-600 mb-8 pb-1 flex justify-between items-end">
             <h2 className="text-xl font-black uppercase tracking-tighter">Latest News</h2>
             <span className="text-xs font-bold text-gray-400">DeepRest Daily Edition</span>
          </div>

          {featured && <PostCard post={featured} size="large" badge={Badge} />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestRow1.map(post => <PostCard key={post.id} post={post} size="medium" />)}
          </div>

          {/* Inter-article Ad */}
          <div className="my-10">
            <div className="hidden md:block">
              {interArticleAd && <AdSlot code={interArticleAd.code} active={interArticleAd.active} />}
            </div>
            <div className="block md:hidden">
              {mobileInterArticleAd && <AdSlot code={mobileInterArticleAd.code} active={mobileInterArticleAd.active} />}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestRow2.map(post => <PostCard key={post.id} post={post} size="medium" />)}
          </div>
        </div>

        {/* Sidebar Area */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Rect Ad */}
          {sidebarAd && sidebarAd.active && (
            <div className="bg-white p-2 border border-gray-200">
               <AdSlot code={sidebarAd.code} active={true} />
            </div>
          )}

          {/* Trending Section */}
          <div className="bg-white border-t-2 border-rose-600 p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-6 text-rose-600">
                <TrendingUp size={20} />
                <h3 className="font-black uppercase tracking-widest text-sm">Trending Now</h3>
             </div>
             {trending.map((post, idx) => (
               <Link key={post.id} to={`/article/${post.slug}`} className="flex gap-4 mb-4 group last:mb-0">
                  <span className="text-2xl font-black text-gray-200 italic leading-none">{idx + 1}</span>
                  <div className="border-b border-gray-100 pb-2 flex-grow">
                    <h4 className="text-sm font-bold group-hover:text-rose-600 leading-tight">{post.title}</h4>
                  </div>
               </Link>
             ))}
          </div>

          {/* Tenancy Ad */}
          {tenancyAd && tenancyAd.active && (
            <div className="rounded-sm overflow-hidden">
               <AdSlot code={tenancyAd.code} active={true} />
            </div>
          )}

          {/* Newsletter Box */}
          <div className="bg-rose-600 text-white p-8 rounded-sm">
             <h3 className="text-2xl font-black serif italic mb-2">Sleep Better Tonight</h3>
             <p className="text-sm mb-6 opacity-90">Join 50,000+ professionals receiving our weekly DeepRest briefing.</p>
             <div className="space-y-3">
                <input type="email" placeholder="Your work email" className="w-full bg-white/10 border border-white/20 p-3 text-sm focus:outline-none placeholder:text-white/50" />
                <button className="w-full bg-white text-rose-600 font-black uppercase py-3 text-xs tracking-widest hover:bg-gray-100 transition">Subscribe</button>
             </div>
          </div>

          {/* Sticky Ad */}
          <div className="sticky top-24 hidden lg:block">
            {stickyAd && stickyAd.active && (
              <div className="bg-white p-2 border border-gray-200 shadow-lg">
                <AdSlot code={stickyAd.code} active={true} />
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Categorized Content Strips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {Object.values(Category).slice(0, 3).map(category => (
          <div key={category} className="bg-white p-4 border-t-2 border-gray-900">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-black uppercase tracking-widest text-sm">{category}</h3>
                <ChevronRight className="text-rose-600" size={16} />
             </div>
             {posts.filter(p => p.category === category).slice(0, 3).map(post => (
               <PostCard key={post.id} post={post} />
             ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
