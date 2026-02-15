
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, AdConfig, Category } from '../types';
import { Facebook, Twitter, Mail, Link as LinkIcon, User, Clock, ArrowLeft, TrendingUp } from 'lucide-react';
import { AdSlot } from '../App';

interface ArticlePageProps {
  posts: Post[];
  ads: AdConfig[];
}

const ArticlePage: React.FC<ArticlePageProps> = ({ posts, ads }) => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = post.seoTitle;
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black mb-4">404 - Article Not Found</h1>
        <Link to="/" className="text-rose-600 font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  const related = posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);
  
  // Ad slots
  const inArticleRectAd = ads.find(a => a.id === 'in-article-rect');
  const inTextBannerAd = ads.find(a => a.id === 'in-text-banner');
  const skyscraperAd = ads.find(a => a.id === 'skyscraper');
  const videoAd = ads.find(a => a.id === 'in-stream-video');
  const badgeAd = ads.find(a => a.id === 'sponsorship-badge');
  const mobileInTextAd = ads.find(a => a.id === 'mobile-in-text');

  return (
    <article className="bg-white">
      {/* Top Breadcrumb & Share */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
         <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-rose-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900 flex items-center">
              {post.category}
              {badgeAd && badgeAd.active && <span className="ml-2 inline-block"><AdSlot code={badgeAd.code} active={true} /></span>}
            </span>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-gray-600">Share:</span>
            <Facebook size={14} className="hover:text-rose-600 cursor-pointer" />
            <Twitter size={14} className="hover:text-rose-600 cursor-pointer" />
            <Mail size={14} className="hover:text-rose-600 cursor-pointer" />
            <LinkIcon size={14} className="hover:text-rose-600 cursor-pointer" />
         </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 py-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black serif text-gray-900 leading-tight mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-100">
               <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600"><User size={20}/></div>
                  <div className="text-xs font-bold uppercase tracking-widest">By <span className="text-rose-600">{post.author}</span></div>
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <Clock size={16} />
                  <span>Published: {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
               </div>
            </div>
          </header>

          {/* Video Ad Spot */}
          {videoAd && videoAd.active && (
            <div className="mb-8 overflow-hidden rounded-md">
              <AdSlot code={videoAd.code} active={true} />
            </div>
          )}

          <figure className="mb-8">
            <img src={post.imageUrl} alt={post.altText} className="w-full rounded-sm" />
            <figcaption className="text-xs text-gray-400 italic mt-2 text-center">{post.altText}</figcaption>
          </figure>

          {/* In-text Banner Slot 1 */}
          {inTextBannerAd && inTextBannerAd.active && (
            <div className="my-8 hidden md:block">
              <AdSlot code={inTextBannerAd.code} active={true} />
            </div>
          )}
          {mobileInTextAd && mobileInTextAd.active && (
            <div className="my-8 block md:hidden">
              <AdSlot code={mobileInTextAd.code} active={true} />
            </div>
          )}

          <div className="relative">
            <div 
              className="prose prose-rose max-w-none text-gray-800 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* In-article Rectangle Slot */}
            {inArticleRectAd && inArticleRectAd.active && (
              <div className="md:float-right md:ml-8 md:mb-8 md:w-80 w-full flex justify-center py-4">
                <AdSlot code={inArticleRectAd.code} active={true} />
              </div>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
             <h3 className="font-black uppercase tracking-tighter text-sm mb-6 flex items-center gap-2">
               <TrendingUp size={16} className="text-rose-600" /> Related Stories
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(r => (
                  <Link key={r.id} to={`/article/${r.slug}`} className="group">
                    <img src={r.imageUrl} alt={r.altText} className="w-full aspect-video object-cover mb-2" />
                    <h4 className="text-sm font-bold group-hover:text-rose-600 transition-colors leading-tight">{r.title}</h4>
                  </Link>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
           <div className="sticky top-28 space-y-10">
              {/* Skyscraper Ad */}
              {skyscraperAd && skyscraperAd.active && (
                <div className="bg-gray-50 p-2 flex justify-center border border-gray-100">
                  <AdSlot code={skyscraperAd.code} active={true} />
                </div>
              )}

              <div className="p-6 border border-gray-100 bg-white">
                <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-gray-400">Must Read</h3>
                <div className="space-y-4">
                  {posts.slice(0, 5).map(p => (
                    <Link key={p.id} to={`/article/${p.slug}`} className="block border-b border-gray-50 pb-3 group">
                       <h4 className="text-sm font-bold group-hover:text-rose-600 transition-colors leading-tight">{p.title}</h4>
                       <span className="text-[10px] text-gray-400 uppercase mt-1 inline-block">{p.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
           </div>
        </aside>
      </div>
    </article>
  );
};

export default ArticlePage;
