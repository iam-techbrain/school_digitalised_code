// Admin Blog Publisher Logic for School Evolution
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-blog-form");
  const titleInput = document.getElementById("form-title");
  const categorySelect = document.getElementById("form-category");
  const readTimeInput = document.getElementById("form-readtime");
  const summaryInput = document.getElementById("form-summary");
  const authorNameInput = document.getElementById("form-author-name");
  const authorRoleInput = document.getElementById("form-author-role");
  const coverInput = document.getElementById("form-cover");
  const tagsInput = document.getElementById("form-tags");
  const contentInput = document.getElementById("form-content");

  // Preview elements
  const previewTitle = document.getElementById("preview-title");
  const previewCategory = document.getElementById("preview-category");
  const previewSummary = document.getElementById("preview-summary");
  const previewAuthor = document.getElementById("preview-author");
  const previewCover = document.getElementById("preview-cover");
  const previewReadtime = document.getElementById("preview-readtime");

  // Sample templates & helpers
  const sampleImages = [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80"
  ];

  let sampleImgIndex = 0;
  document.getElementById("use-preset-img-btn")?.addEventListener("click", () => {
    sampleImgIndex = (sampleImgIndex + 1) % sampleImages.length;
    coverInput.value = sampleImages[sampleImgIndex];
    previewCover.src = sampleImages[sampleImgIndex];
  });

  document.getElementById("insert-sample-content")?.addEventListener("click", () => {
    contentInput.value = `<h2>Introduction</h2>
<p>In today's fast-paced educational landscape, schools need agile methodologies and reliable digital tools to foster student success and operational transparency.</p>

<blockquote>"Digital transformation in schools is not merely about hardware; it is about cultivating collaborative learning communities."</blockquote>

<h3>Key Implementation Highlights</h3>
<ul>
  <li><strong>Enhanced Engagement:</strong> Interactive multimedia lessons increase retention by up to 40%.</li>
  <li><strong>Streamlined Reporting:</strong> Instant progress dashboards keep teachers, parents, and mentors on the exact same page.</li>
  <li><strong>Safe Learning Spaces:</strong> Proactive digital hygiene prevents online distractions and security threats.</li>
</ul>

<h2>Actionable Steps for School Administrators</h2>
<p>To begin, conduct a pilot with one academic department, gather feedback from senior faculty, and progressively expand campus-wide.</p>`;
  });

  // Live preview synchronization
  function updatePreview() {
    if (previewTitle) previewTitle.textContent = titleInput.value || "Article Title will appear here...";
    if (previewSummary) previewSummary.textContent = summaryInput.value || "Summary will appear here as you type...";
    if (previewAuthor) previewAuthor.textContent = authorNameInput.value || "School Editorial";
    if (previewReadtime) previewReadtime.textContent = readTimeInput.value || "5 min read";
    if (previewCover && coverInput.value) previewCover.src = coverInput.value;

    const [catName] = (categorySelect.value || "EdTech & AI").split("|");
    if (previewCategory) previewCategory.textContent = catName;
  }

  [titleInput, summaryInput, authorNameInput, readTimeInput, coverInput].forEach(inp => {
    inp?.addEventListener("input", updatePreview);
  });
  categorySelect?.addEventListener("change", updatePreview);

  // Slug generator
  function createSlug(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '') + '-' + Date.now().toString().slice(-4);
  }

  // Get current date formatted
  function getTodayString() {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date().toLocaleDateString('en-GB', options);
  }

  // Handle Form Submission (Publish to localStorage)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const [categoryName, categorySlug] = categorySelect.value.split("|");
    const summary = summaryInput.value.trim();
    const authorName = authorNameInput.value.trim();
    const authorRole = authorRoleInput.value.trim() || "School Staff";
    const coverImage = coverInput.value.trim();
    const readTime = readTimeInput.value.trim() || "5 min read";
    const tags = tagsInput.value.split(",").map(t => t.trim()).filter(Boolean);
    const content = contentInput.value.trim();
    const slug = createSlug(title);

    const newPost = {
      id: "post_" + Date.now(),
      slug: slug,
      title: title,
      summary: summary,
      category: categoryName,
      categorySlug: categorySlug,
      author: {
        name: authorName,
        role: authorRole,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      publishedAt: getTodayString(),
      readTime: readTime,
      featured: false,
      coverImage: coverImage,
      tags: tags.length ? tags : ["Education", "School Evolution"],
      content: content
    };

    const existing = JSON.parse(localStorage.getItem("school_custom_blogs") || "[]");
    existing.unshift(newPost);
    localStorage.setItem("school_custom_blogs", JSON.stringify(existing));

    showToast("🎉 Article published successfully! Visible immediately on main blog.");
    renderCustomPosts();

    // Reset inputs
    titleInput.value = "";
    summaryInput.value = "";
    contentInput.value = "";
    updatePreview();
  });

  // Render published custom posts
  function renderCustomPosts() {
    const list = document.getElementById("custom-posts-list");
    const countBadge = document.getElementById("custom-posts-count");
    const posts = JSON.parse(localStorage.getItem("school_custom_blogs") || "[]");

    if (countBadge) countBadge.textContent = `${posts.length} post${posts.length === 1 ? '' : 's'}`;

    if (posts.length === 0) {
      list.innerHTML = `<p class="text-xs text-slate-400 py-4 text-center">No custom articles published yet. Write one using the form on the left!</p>`;
      return;
    }

    list.innerHTML = posts.map(p => `
      <div class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3">
        <div class="min-w-0">
          <p class="text-xs font-bold text-slate-800 truncate">${p.title}</p>
          <p class="text-[10px] text-slate-400">${p.category} • ${p.publishedAt}</p>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <a href="post.html?slug=${p.slug}" target="_blank" class="p-1 text-slate-500 hover:text-brand-600" title="View article">
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </a>
          <button data-id="${p.id}" class="delete-post-btn p-1 text-slate-400 hover:text-rose-600" title="Delete article">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `).join("");

    list.querySelectorAll(".delete-post-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const filtered = posts.filter(item => item.id !== id);
        localStorage.setItem("school_custom_blogs", JSON.stringify(filtered));
        showToast("Article deleted from custom posts.");
        renderCustomPosts();
      });
    });

    lucide.createIcons();
  }

  // Clear all
  document.getElementById("clear-all-custom")?.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all custom articles from this browser?")) {
      localStorage.removeItem("school_custom_blogs");
      renderCustomPosts();
      showToast("All custom articles cleared.");
    }
  });

  // Export to JSON snippet for data.js
  const exportBtn = document.getElementById("export-json-btn");
  const codeBox = document.getElementById("code-snippet-box");
  const codePre = document.getElementById("code-snippet-pre");
  const copySnippetBtn = document.getElementById("copy-snippet-btn");

  if (exportBtn && codeBox && codePre) {
    exportBtn.addEventListener("click", () => {
      const [categoryName, categorySlug] = (categorySelect.value || "EdTech & AI|edtech-ai").split("|");
      const snippetObj = {
        id: Date.now().toString(),
        slug: createSlug(titleInput.value || "sample-title"),
        title: titleInput.value || "Your Article Title",
        summary: summaryInput.value || "Short summary of article...",
        category: categoryName,
        categorySlug: categorySlug,
        author: {
          name: authorNameInput.value || "School Editorial",
          role: authorRoleInput.value || "Educator",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        publishedAt: getTodayString(),
        readTime: readTimeInput.value || "5 min read",
        featured: false,
        coverImage: coverInput.value,
        tags: tagsInput.value.split(",").map(t => t.trim()).filter(Boolean),
        content: contentInput.value || "<p>Article content goes here...</p>"
      };

      const codeString = JSON.stringify(snippetObj, null, 2);
      codePre.textContent = codeString;
      codeBox.classList.remove("hidden");
      showToast("Snippet generated! Click Copy to copy code for js/data.js");
    });
  }

  if (copySnippetBtn && codePre) {
    copySnippetBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(codePre.textContent).then(() => {
        showToast("Snippet copied to clipboard!");
      });
    });
  }

  // Toast Function
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

  renderCustomPosts();
  updatePreview();
});
