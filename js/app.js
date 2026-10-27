// Main Application Script for School Evolution Blog
document.addEventListener("DOMContentLoaded", () => {
  let currentCategory = "all";
  let searchQuery = "";

  // Elements
  const featuredContainer = document.getElementById("featured-article-container");
  const articlesGrid = document.getElementById("articles-grid");
  const categoryPillsContainer = document.getElementById("category-pills");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search");
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const newsletterForm = document.getElementById("newsletter-form");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 1. Render Featured Article
  function renderFeatured() {
    if (!featuredContainer) return;
    const featured = getFeaturedPost();
    if (!featured) return;

    featuredContainer.innerHTML = `
      <div class="relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 group">
        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          <!-- Image Column with subtle zoom on hover -->
          <div class="lg:col-span-7 relative overflow-hidden min-h-[260px] lg:min-h-full">
            <img 
              src="${featured.coverImage}" 
              alt="${featured.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 lg:via-transparent to-transparent"></div>
            
            <div class="absolute top-4 left-4 z-10">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-600 text-white shadow-lg">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                ${featured.category}
              </span>
            </div>
          </div>

          <!-- Content Column -->
          <div class="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-slate-900 text-white z-10">
            <div>
              <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${featured.publishedAt}</span>
                <span>•</span>
                <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${featured.readTime}</span>
              </div>

              <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white hover:text-brand-300 transition leading-snug">
                <a href="post.html?slug=${featured.slug}">${featured.title}</a>
              </h3>

              <p class="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                ${featured.summary}
              </p>

              <!-- Tags -->
              <div class="mt-5 flex flex-wrap gap-1.5">
                ${featured.tags.map(tag => `
                  <span class="text-[11px] font-medium bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/60">
                    #${tag}
                  </span>
                `).join("")}
              </div>
            </div>

            <!-- Author & Read More CTA -->
            <div class="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img 
                  src="${featured.author.avatar}" 
                  alt="${featured.author.name}" 
                  class="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/50"
                >
                <div>
                  <h4 class="text-sm font-semibold text-white">${featured.author.name}</h4>
                  <p class="text-xs text-slate-400">${featured.author.role}</p>
                </div>
              </div>

              <a 
                href="post.html?slug=${featured.slug}" 
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-brand-600/30 group-hover:translate-x-1"
              >
                <span>Read Full</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  // 2. Render Category Filter Pills
  function renderCategoryPills() {
    if (!categoryPillsContainer) return;
    const categories = getCategories();

    const pillsHtml = categories.map(cat => `
      <button 
        class="category-filter-btn px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap bg-white text-slate-600 border border-slate-200 hover:border-brand-300 hover:text-brand-600 shadow-sm"
        data-category="${cat.slug}"
      >
        ${cat.name} <span class="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">${cat.count}</span>
      </button>
    `).join("");

    categoryPillsContainer.innerHTML = `
      <button 
        class="category-filter-btn px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap bg-brand-600 text-white shadow-sm" 
        data-category="all"
      >
        All Topics (${getAllPosts().length})
      </button>
      ${pillsHtml}
    `;

    // Add event listeners to category buttons
    const btns = categoryPillsContainer.querySelectorAll(".category-filter-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => {
          b.className = "category-filter-btn px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap bg-white text-slate-600 border border-slate-200 hover:border-brand-300 hover:text-brand-600 shadow-sm";
        });
        btn.className = "category-filter-btn px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap bg-brand-600 text-white shadow-sm";

        currentCategory = btn.getAttribute("data-category");
        filterAndRenderPosts();
      });
    });
  }

  // 3. Filter & Render Articles Grid
  function filterAndRenderPosts() {
    if (!articlesGrid) return;
    const all = getAllPosts();

    let filtered = all.filter(post => {
      // Category check
      const matchCategory = currentCategory === "all" || post.categorySlug === currentCategory;

      // Search query check (title, summary, tags, author, content)
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.tags.some(tag => tag.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });

    // Update count indicator
    if (resultsCount) {
      if (searchQuery || currentCategory !== "all") {
        resultsCount.textContent = `Showing ${filtered.length} matching article${filtered.length === 1 ? '' : 's'}`;
      } else {
        resultsCount.textContent = `Showing all ${filtered.length} published articles`;
      }
    }

    if (filtered.length === 0) {
      articlesGrid.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    articlesGrid.innerHTML = filtered.map(post => `
      <article class="blog-card bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between shadow-sm">
        <div>
          <!-- Card Image Header -->
          <a href="post.html?slug=${post.slug}" class="block relative aspect-[16/10] overflow-hidden bg-slate-100">
            <img 
              src="${post.coverImage}" 
              alt="${post.title}" 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            >
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/95 text-brand-700 shadow-sm backdrop-blur-sm">
                ${post.category}
              </span>
            </div>
          </a>

          <!-- Card Content -->
          <div class="p-6">
            <div class="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
              <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${post.publishedAt}</span>
              <span>•</span>
              <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${post.readTime}</span>
            </div>

            <h3 class="text-xl font-bold text-slate-900 hover:text-brand-600 transition leading-snug line-clamp-2 mb-3">
              <a href="post.html?slug=${post.slug}">
                ${post.title}
              </a>
            </h3>

            <p class="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
              ${post.summary}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1 mb-2">
              ${post.tags.slice(0, 2).map(tag => `
                <span class="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                  #${tag}
                </span>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Card Footer with Author & Link -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <img 
              src="${post.author.avatar}" 
              alt="${post.author.name}" 
              class="w-8 h-8 rounded-full object-cover border border-slate-200"
            >
            <div>
              <p class="text-xs font-semibold text-slate-800">${post.author.name}</p>
              <p class="text-[10px] text-slate-400">${post.author.role}</p>
            </div>
          </div>

          <a 
            href="post.html?slug=${post.slug}" 
            class="text-brand-600 hover:text-brand-700 font-semibold text-xs flex items-center gap-1 hover:translate-x-0.5 transition-transform"
          >
            <span>Read</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </article>
    `).join("");

    lucide.createIcons();
  }

  // Search input handler with debounce
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (searchQuery.trim().length > 0) {
          clearSearchBtn.classList.remove("hidden");
        } else {
          clearSearchBtn.classList.add("hidden");
        }
      }
      filterAndRenderPosts();
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.classList.add("hidden");
      filterAndRenderPosts();
    });
  }

  // Reset filters
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      currentCategory = "all";
      searchQuery = "";
      if (searchInput) searchInput.value = "";
      if (clearSearchBtn) clearSearchBtn.classList.add("hidden");
      renderCategoryPills();
      filterAndRenderPosts();
    });
  }

  // Newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("newsletter-email");
      if (emailInput && emailInput.value) {
        showToast(`Thank you! ${emailInput.value} has been subscribed to School Evolution insights.`);
        emailInput.value = "";
      }
    });
  }

  // Toast Helper
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
    }, 4000);
  };

  // Initial Execution
  renderFeatured();
  renderCategoryPills();
  filterAndRenderPosts();
});
