
import { Category, Post, AdConfig } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Why You’re Still Tired After a Full Night’s Sleep',
    slug: 'why-still-tired-after-full-sleep',
    summary: 'Waking up exhausted despite getting eight hours of rest is a common frustration. Discover the difference between sleep quantity and quality.',
    content: `<h2>The Quality vs. Quantity Paradox</h2><p>We’ve been told since childhood that eight hours is the "magic number." Yet, many of us wake up feeling like we’ve barely closed our eyes. This phenomenon, often called 'non-restorative sleep,' suggests that while you are unconscious, your brain isn't successfully navigating the necessary cycles of repair.</p><h3>1. Sleep Fragmentation</h3><p>Even if you don't remember waking up, your brain might be experiencing micro-arousals. These can be caused by ambient noise, a partner moving, or mild sleep apnea. Each "ping" pulls you out of deep sleep, resetting the clock on your recovery.</p><h3>2. The Role of Sleep Hygiene</h3><p>Your body is a finely tuned machine. If you consume caffeine late in the day or use high-intensity blue light screens before bed, your brain may be "sleeping" but your nervous system is still wired, preventing the transition into Stage 3 REM sleep.</p>`,
    category: Category.RECOVERY,
    author: 'Dr. Helena Vance',
    date: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1541781719117-a23a4a158ec2?auto=format&fit=crop&q=80&w=1200',
    seoTitle: 'Why Am I Still Tired After 8 Hours? | DeepRest Journal',
    metaDescription: 'Explore the hidden reasons why you wake up exhausted even after a full night of sleep. Learn about sleep quality, fragmentation, and recovery.',
    keywords: ['tired after sleep', 'non-restorative sleep', 'sleep quality', 'exhaustion'],
    canonicalUrl: 'https://deeprestjournal.com/why-still-tired-after-full-sleep',
    altText: 'A woman sitting up in bed looking exhausted despite it being morning.'
  },
  {
    id: '2',
    title: 'Night Anxiety: Why Your Mind Gets Louder When the Lights Go Off',
    slug: 'night-anxiety-mind-louder-at-night',
    summary: 'The sun goes down and the volume of your thoughts goes up. Understand the science of nocturnal worry and how to silence it.',
    content: `<h2>The Midnight Echo Chamber</h2><p>During the day, we are surrounded by distractions—work, family, entertainment, and social interaction. When we lie in bed, those distractions disappear, leaving us alone with our thoughts. For those with anxiety, this silence acts as a megaphone for every "what if" and "I should have" that was ignored during the day.</p><h3>The Biological Component</h3><p>As evening progresses, our cortisol levels (the stress hormone) should naturally drop. However, if you are chronically stressed, these levels may remain elevated or spike at odd hours, triggering a "fight or flight" response while you are trying to rest.</p><h3>Breaking the Silence</h3><p>Cognitive Behavioral Therapy for Insomnia (CBT-I) suggests 'Scheduled Worry Time' during the day. By giving your worries a dedicated 15 minutes at 4:00 PM, you train your brain that 11:00 PM is not the time for problem-solving.</p>`,
    category: Category.ANXIETY,
    author: 'Julian Thorne, PsyD',
    date: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=1200',
    seoTitle: 'Night Anxiety: Why Your Mind Races at Bedtime',
    metaDescription: 'Understand why anxiety peaks at night and learn psychological strategies to calm your racing mind before sleep.',
    keywords: ['night anxiety', 'racing thoughts', 'bedtime worry', 'insomnia anxiety'],
    canonicalUrl: 'https://deeprestjournal.com/night-anxiety-mind-louder-at-night',
    altText: 'A person staring at the ceiling in a dark room.'
  }
];

const AD_LINK_1 = "https://prime-president.com/djm-FLzEd.GcNBvPZUG/US/JeIms9euUZkUBlWk/PiTlYR4sMHDxE/2wMuDRUxtHNCjRg/w-MRTqYwwvOeQG";
const AD_LINK_2 = "https://honorablecalm.com/bK3AV.0qPV3/pSvdblmwV_J/ZVD/0k2/OiDSAwx/NSjzY/xXLKTiYI4uMqDZEf2aN/jaUo";

// Tier Scripts
const AD_SCRIPT_1 = `<script>(function(swc){var d = document, s = d.createElement('script'), l = d.scripts[d.scripts.length - 1];s.settings = swc || {};s.src = "\\/\\/insistentbonus.com\\/b\\/XkVys.dQG\\/lx0fYgWrcx\\/AeHmV9ruqZ\\/UcljkDPZTwYg4zM\\/DMEV2MMWTdMXtCNEjqgFwdMsT\\/YuxCNBwB";s.async = true;s.referrerPolicy = 'no-referrer-when-downgrade';l.parentNode.insertBefore(s, l);})({})</script>`;
const AD_SCRIPT_2 = `<script>(function(aaac){var d = document, s = d.createElement('script'), l = d.scripts[d.scripts.length - 1];s.settings = aaac || {};s.src = "\\/\\/insistentbonus.com\\/b.X-V\\/s_d\\/GLlR0tYUWgcl\\/Xe\\/mk9nupZ_UAlRk\\/PVTDY\\/4tMtDFE\\/2bM\\/jhketQNHjcgNwZMgT\\/YQzPMkwv";s.async = true;s.referrerPolicy = 'no-referrer-when-downgrade';l.parentNode.insertBefore(s, l);})({})</script>`;
const AD_SCRIPT_3 = `<script>(function(pyqv){var d = document, s = d.createElement('script'), l = d.scripts[d.scripts.length - 1];s.settings = pyqv || {};s.src = "\\/\\/insistentbonus.com\\/bZX.VUs\\/d\\/GMlg0_YDWMcc\\/DedmH9\\/usZUUPlAkjPZTwYq4JMpD\\/EK2xNdD\\/UCtxNdj\\/gWwjM_TrYr0NOsQJ";s.async = true;s.referrerPolicy = 'no-referrer-when-downgrade';l.parentNode.insertBefore(s, l);})({})</script>`;
const AD_SCRIPT_4 = `<script>(function(htx){var d = document, s = d.createElement('script'), l = d.scripts[d.scripts.length - 1];s.settings = htx || {};s.src = "\\/\\/prime-president.com\\/cCD.9V6tbk2z5elTStW-QT9VNRjTgewqMVThYp2dMxSW0l2NOsDTAwxnNPj\\/YV1b";s.async = true;s.referrerPolicy = 'no-referrer-when-downgrade';l.parentNode.insertBefore(s, l);})({})</script>`;
const AD_SCRIPT_5 = `<script type="text/javascript">aclib.runAutoTag({zoneId: 'aene5porrc'});</script>`;

export const INITIAL_ADS: AdConfig[] = [
  { 
    id: 'leaderboard-top', 
    placement: 'Leaderboard – top of page', 
    code: `<div class="bg-gray-50 border-b border-gray-100">${AD_SCRIPT_1}<a href="${AD_LINK_1}" target="_blank" class="block w-full h-24 bg-zinc-900 flex items-center justify-between px-8 text-white group shadow-inner overflow-hidden border-t-2 border-rose-600">
      <div class="flex flex-col">
        <span class="text-[9px] uppercase font-bold tracking-[0.4em] text-gray-400 mb-1">Advertisement</span>
        <span class="text-lg md:text-xl font-black serif italic leading-none">Complete Sleep Optimization Guide 2024</span>
      </div>
      <div class="bg-rose-600 text-white px-6 py-2.5 rounded font-black text-xs uppercase tracking-widest group-hover:bg-rose-700 transition shadow-lg">Get Access &raquo;</div>
    </a></div>`, 
    active: true 
  },
  { 
    id: 'sidebar-rect', 
    placement: 'Medium Rectangle – sidebar', 
    code: `<div class="bg-white p-1 border border-gray-200">${AD_SCRIPT_4}<a href="${AD_LINK_1}" target="_blank" class="block w-full h-64 bg-zinc-50 border border-gray-100 p-6 flex flex-col justify-center items-center text-center group transition">
      <span class="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Advertisement</span>
      <h3 class="text-xl font-bold serif italic text-zinc-800 mb-6 leading-tight">Advanced Recovery Protocols for High Performers</h3>
      <div class="bg-rose-600 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest group-hover:scale-105 transition shadow-md">Download Protocol</div>
    </a></div>`, 
    active: true 
  },
  { 
    id: 'anchor-bottom', 
    placement: 'Anchor – bottom pinned banner', 
    code: `<div class="bg-zinc-900 border-t border-rose-600">${AD_SCRIPT_2}<a href="${AD_LINK_2}" target="_blank" class="text-white h-full flex items-center justify-center text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] hover:text-rose-500 transition px-4 text-center">
      <span class="bg-rose-600 px-2 py-0.5 rounded text-[9px] mr-3 font-black">LATEST</span> 
      Unlock Your Full Potential: The DeepRest Recovery Protocol Is Now Available &raquo;
    </a></div>`, 
    active: true 
  },
  { 
    id: 'in-article-rect', 
    placement: 'Medium Rectangle – inside article', 
    code: `<div class="bg-white border border-gray-100 p-1 my-6">${AD_SCRIPT_4}<a href="${AD_LINK_2}" target="_blank" class="block w-full h-64 bg-zinc-900 flex flex-col items-center justify-center text-center p-6 group">
      <span class="text-[8px] font-black uppercase tracking-[0.3em] text-rose-500 mb-4">Sponsored Content</span>
      <h4 class="text-xl font-black serif text-white mb-6 leading-tight italic">Natural Sleep Aid: The 5-Minute Evening Ritual Used by CEOs</h4>
      <div class="bg-rose-600 text-white px-6 py-3 text-xs font-black uppercase group-hover:bg-rose-700 transition shadow-xl">See The Ritual &raquo;</div>
    </a></div>`, 
    active: true 
  },
  { 
    id: 'tenancy-rect', 
    placement: 'Tenancy Rectangle', 
    code: `<div class="bg-white border border-gray-200">${AD_SCRIPT_3}<a href="${AD_LINK_2}" target="_blank" class="bg-zinc-50 text-zinc-900 h-48 flex flex-col items-center justify-center p-6 text-center border-b-2 border-rose-600 group">
      <span class="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Platinum Partner</span>
      <span class="text-lg serif font-bold leading-tight mb-4 italic">OPTIMIZE YOUR CIRCADIAN RHYTHM NATURALLY</span>
      <span class="text-[10px] bg-zinc-900 text-white px-4 py-2 uppercase font-black group-hover:bg-rose-600 transition">Learn More &raquo;</span>
    </a></div>`, 
    active: true 
  },
  { 
    id: 'in-text-banner', 
    placement: 'In-text banners – inside content', 
    code: `<div class="my-8">${AD_SCRIPT_3}<a href="${AD_LINK_1}" target="_blank" class="block bg-rose-50 border-y border-rose-100 py-3 text-center text-rose-700 font-bold text-xs uppercase tracking-widest hover:bg-rose-100 transition">AD: Shop the New Winter Recovery Collection - Limited Time Offer &raquo;</a></div>`, 
    active: true 
  },
  { 
    id: 'sticky-sidebar', 
    placement: 'Sticky banners – scroll-stick', 
    code: `<div class="bg-white border border-gray-200">${AD_SCRIPT_3}<a href="${AD_LINK_2}" target="_blank" class="block bg-zinc-900 text-white h-96 flex flex-col items-center justify-center text-xs p-8 text-center italic hover:bg-black transition border-l-4 border-rose-600 shadow-xl">
    <span class="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500 mb-8 not-italic">Health Update</span>
    <span class="text-2xl serif font-black leading-tight mb-10">Reclaim Your Energy: The Missing Link in Modern Recovery</span>
    <span class="bg-rose-600 px-6 py-3 font-black not-italic uppercase tracking-widest shadow-2xl">Start Here &raquo;</span>
  </a></div>`, 
    active: true 
  },
  { 
    id: 'inter-article', 
    placement: 'Inter-article banners', 
    code: `<div class="py-4">${AD_SCRIPT_3}<a href="${AD_LINK_2}" target="_blank" class="block bg-zinc-50 py-8 px-6 text-center text-zinc-800 border border-gray-200 font-bold uppercase tracking-[0.1em] hover:bg-white transition">
      <span class="text-[9px] text-gray-400 mb-3 block font-black uppercase tracking-[0.3em]">Advertisement</span>
      Discover the Sleep Hygiene Habits of Elite Athletes &raquo;
    </a></div>`, 
    active: true 
  },
  { 
    id: 'skyscraper', 
    placement: 'Skyscraper – tall sidebar', 
    code: `<div class="bg-white border border-gray-200">${AD_SCRIPT_2}<a href="${AD_LINK_2}" target="_blank" class="bg-zinc-50 h-[600px] flex items-center justify-center text-zinc-400 text-[10px] [writing-mode:vertical-lr] font-black uppercase tracking-[0.4em] hover:bg-white transition border-r border-gray-100">PLATINUM SPONSOR PLACEMENT &raquo;</a></div>`, 
    active: true 
  },
  { 
    id: 'mobile-leaderboard', 
    placement: 'Mobile Leaderboard', 
    code: `<div class="bg-zinc-900">${AD_SCRIPT_4}<a href="${AD_LINK_1}" target="_blank" class="h-16 w-full flex items-center justify-between px-6 text-white border-b border-rose-600">
      <div class="flex flex-col">
        <span class="text-[8px] text-gray-400 uppercase font-black">Advertisement</span>
        <span class="text-xs font-black italic serif">RESTORE YOUR REST TODAY</span>
      </div>
      <span class="text-[10px] font-black uppercase bg-rose-600 px-3 py-1.5 rounded shadow-lg">JOIN &raquo;</span>
    </a></div>`, 
    active: true 
  },
  { 
    id: 'mobile-anchor', 
    placement: 'Mobile Anchor', 
    code: `<div class="bg-zinc-900 border-t border-rose-600">${AD_SCRIPT_2}<a href="${AD_LINK_2}" target="_blank" class="text-white h-full w-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest px-6 hover:bg-black transition">Critical Sleep Health Update &raquo;</a></div>`, 
    active: true 
  },
  {
    id: 'interstitial',
    placement: 'Interstitial – automatic overlay',
    code: `<div>${AD_SCRIPT_5}<div class="p-12 md:p-20 text-center bg-white"><div class="inline-block bg-rose-100 text-rose-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-6">Partner Update</div><h2 class="text-3xl md:text-5xl font-black serif italic text-zinc-900 mb-6 leading-tight">Master Your Sleep Health Before 2024 Ends</h2><p class="mb-10 text-gray-500 text-lg max-w-xl mx-auto">Join our executive health circle for the latest breakthroughs in non-clinical recovery strategies.</p><a href="${AD_LINK_2}" target="_blank" class="bg-rose-600 text-white px-10 py-5 font-black uppercase tracking-[0.2em] text-sm hover:bg-rose-700 transition shadow-2xl inline-block">Claim Priority Invite &raquo;</a></div></div>`,
    active: true
  }
];
