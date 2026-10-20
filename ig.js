/* Instagram embeds — renders the posts listed under "instagram" in /data/workshops.json.
   Usage: put <div id="igPosts"></div> on the page, include this script, then call renderInstagram(urls). */
window.renderInstagram = function (urls) {
  const box = document.getElementById('igPosts');
  if (!box) return;
  const wrap = box.closest('[data-ig-section]');
  const list = (urls || []).filter(u => /^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/?$/.test(u));
  if (!list.length) { if (wrap) wrap.hidden = true; return; }
  if (wrap) wrap.hidden = false;
  box.innerHTML = list.map(u => {
    const url = u.endsWith('/') ? u : u + '/';
    return `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14"
      style="background:#fff;border:1px solid rgba(14,12,12,0.10);border-radius:6px;margin:0;max-width:540px;min-width:280px;width:100%;padding:0;">
      <a href="${url}" target="_blank" rel="noopener" style="display:block;padding:24px;font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:#8a8480;text-decoration:none;text-align:center;">View this post on Instagram</a>
    </blockquote>`;
  }).join('');
  const process = () => window.instgrm && window.instgrm.Embeds.process();
  if (window.instgrm) return process();
  if (!document.getElementById('igEmbedJs')) {
    const s = document.createElement('script');
    s.id = 'igEmbedJs'; s.async = true; s.src = 'https://www.instagram.com/embed.js';
    s.onload = process;
    document.body.appendChild(s);
  }
};
