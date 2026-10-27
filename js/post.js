// Post Reader Logic for School Evolution
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug") || urlParams.get("id");

  // Load post
  let post = null;
  if (slug) {
    post = getPostBySlug(slug);
  }
  if (!post) {
    // Default to first post
    const all = getAllPosts();
    post = all[0];
  }

  if (!post) {
    document.getElementById("main-content").innerHTML = `
      <div class="text-center py-24">
        <h2 class="text-2xl font-bold text-slate-800">Article not found</h2>
        <a href="index.html" class="mt-4 inline-block px-5 py-2.5 bg-brand-600 text-white rounded-xl">Return to Blog</a>
      </div>
    `;
    return;
  }

  // Set Title & Metadata
  document.title = `${post.title} | School Evolution`;

  // Populate Elements
  document.getElementById("post-breadcrumb-category").textContent = post.category;
  document.getElementById("post-breadcrumb-title").textContent = post.title;
  document.getElementById("post-category").textContent = post.category;
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-summary").textContent = post.summary;

  document.getElementById("post-author-name").textContent = post.author.name;
  document.getElementById("post-author-role").textContent = post.author.role;
  document.getElementById("post-author-avatar").src = post.author.avatar;

  document.getElementById("post-author-name-bio").textContent = post.author.name;
  document.getElementById("post-author-role-bio").textContent = post.author.role;
  document.getElementById("post-author-avatar-bio").src = post.author.avatar;

  document.getElementById("post-date").textContent = post.publishedAt;
  document.getElementById("post-readtime").textContent = post.readTime;

  const coverImg = document.getElementById("post-cover");
  coverImg.src = post.coverImage;
  coverImg.alt = post.title;

  // Article Body
  document.getElementById("post-body").innerHTML = post.content;

  // Tags
  const tagsContainer = document.getElementById("post-tags");
  tagsContainer.innerHTML = post.tags.map(t => `
    <span class="text-xs bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-700 px-3 py-1 rounded-lg font-medium transition cursor-pointer">
      #${t}
    </span>
  `).join("");

  // Reading Progress Bar
  const progressBar = document.getElementById("reading-progress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  });

  // Claps / Likes Persistence
  const clapStorageKey = `school_claps_${post.slug}`;
  let claps = parseInt(localStorage.getItem(clapStorageKey) || "28", 10);
  const clapBtn = document.getElementById("clap-btn");
  const clapCount = document.getElementById("clap-count");
  clapCount.textContent = claps;

  clapBtn.addEventListener("click", () => {
    claps++;
    localStorage.setItem(clapStorageKey, claps.toString());
    clapCount.textContent = claps;
    clapBtn.classList.add("scale-110", "bg-brand-100", "text-brand-700");
    setTimeout(() => {
      clapBtn.classList.remove("scale-110");
    }, 200);
  });

  // Sharing
  const currentUrl = window.location.href;
  const shareWhatsApp = document.getElementById("share-whatsapp");
  if (shareWhatsApp) {
    shareWhatsApp.addEventListener("click", () => {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " - " + currentUrl)}`, "_blank");
    });
  }

  const shareLinkedIn = document.getElementById("share-linkedin");
  if (shareLinkedIn) {
    shareLinkedIn.addEventListener("click", () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, "_blank");
    });
  }

  const shareCopy = document.getElementById("share-copy");
  if (shareCopy) {
    shareCopy.addEventListener("click", () => {
      navigator.clipboard.writeText(currentUrl).then(() => {
        showToast("Article link copied to clipboard!");
      }).catch(() => {
        showToast("Link: " + currentUrl);
      });
    });
  }

  // Comments System
  const commentStorageKey = `school_comments_${post.slug}`;
  const defaultComments = [
    {
      name: "Suresh Pillai",
      role: "Vice Principal, St. Xavier's",
      text: "A very timely article for school leaders. We implemented a similar approach last semester and saw immediate improvements in teacher satisfaction.",
      date: "2 days ago"
    }
  ];

  function getStoredComments() {
    const raw = localStorage.getItem(commentStorageKey);
    return raw ? JSON.parse(raw) : defaultComments;
  }

  function renderComments() {
    const list = document.getElementById("comments-list");
    const comments = getStoredComments();
    if (comments.length === 0) {
      list.innerHTML = `<p class="text-sm text-slate-400 italic">Be the first to share your perspective on this post.</p>`;
      return;
    }

    list.innerHTML = comments.map(c => `
      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
              ${c.name.charAt(0)}
            </span>
            <div>
              <span class="text-sm font-bold text-slate-800">${c.name}</span>
              ${c.role ? `<span class="text-xs text-slate-400 ml-1.5">• ${c.role}</span>` : ""}
            </div>
          </div>
          <span class="text-[11px] text-slate-400">${c.date || "Just now"}</span>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed pl-9">${c.text}</p>
      </div>
    `).join("");
  }

  const commentForm = document.getElementById("comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("comment-name").value.trim();
      const role = document.getElementById("comment-role").value.trim();
      const text = document.getElementById("comment-text").value.trim();

      if (name && text) {
        const comments = getStoredComments();
        comments.unshift({
          name,
          role,
          text,
          date: "Just now"
        });
        localStorage.setItem(commentStorageKey, JSON.stringify(comments));
        renderComments();
        commentForm.reset();
        showToast("Your thought has been shared!");
      }
    });
  }

  renderComments();

  // Related Posts
  const allPosts = getAllPosts();
  const related = allPosts.filter(p => p.id !== post.id && p.slug !== post.slug).slice(0, 3);
  const relatedGrid = document.getElementById("related-posts-grid");

  if (relatedGrid && related.length > 0) {
    relatedGrid.innerHTML = related.map(rel => `
      <a href="post.html?slug=${rel.slug}" class="block group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition">
        <div class="aspect-[16/10] overflow-hidden bg-slate-100">
          <img src="${rel.coverImage}" alt="${rel.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
        </div>
        <div class="p-5">
          <span class="text-[11px] font-semibold text-brand-600 uppercase tracking-wide">${rel.category}</span>
          <h4 class="text-base font-bold text-slate-900 group-hover:text-brand-600 transition mt-1 line-clamp-2">
            ${rel.title}
          </h4>
          <p class="text-xs text-slate-500 mt-2 flex items-center gap-2">
            <span>${rel.publishedAt}</span>
            <span>•</span>
            <span>${rel.readTime}</span>
          </p>
        </div>
      </a>
    `).join("");
  }

  // Toast Functionality
  window.showToast = function (message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.remove("translate-y-20", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");

    setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0");
      toast.classList.remove("translate-y-0", "opacity-100");
    }, 3500);
  };

  lucide.createIcons();
});
