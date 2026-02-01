// Blog SPA functionality
class BlogApp {
    constructor() {
        this.posts = [];
        this.currentView = 'list';
        this.currentPost = null;
        this.renderer = null;
    }

    async init() {
        // Load posts and render
        await this.loadPosts();
        this.setupEventListeners();
        this.handleRouting();
    }

    async loadPosts() {
        try {
            const response = await fetch('posts/posts.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.posts = data.posts || [];
            
            if (this.currentView === 'list') {
                this.renderPostsList();
            }
        } catch (error) {
            console.error('Error loading posts:', error);
            this.renderEmptyState();
        }
    }

    renderPostsList() {
        const container = document.getElementById('blog-posts');
        if (!container) return;

        if (this.posts.length === 0) {
            this.renderEmptyState();
            return;
        }

        container.innerHTML = this.posts.map(post => `
            <article class="blog-post" data-category="${post.category || 'general'}" onclick="blogApp.openPost('${post.filename}')">
                <div class="post-header">
                    <div class="post-date">
                        <i class="fas fa-calendar"></i>
                        ${post.date}
                    </div>
                </div>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-excerpt">${post.excerpt || post.description || ''}</p>
                <div class="post-tags">
                    ${(post.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </article>
        `).join('');

        this.updateSidebar();
    }

    renderEmptyState() {
        const container = document.getElementById('blog-posts');
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <h3>No posts yet</h3>
                    <p>Blog posts will appear here when added.</p>
                </div>
            `;
        }
    }

    async openPost(filename) {
        try {
            // Show loading state
            this.showPostView();

            // Find post in loaded posts
            const postData = this.posts.find(p => p.filename === filename);
            if (postData && postData.content) {
                // Render markdown content
                const renderedContent = marked.parse(postData.content);
                
                const post = {
                    ...postData,
                    content: renderedContent
                };
                
                this.currentPost = post;
                this.currentView = 'post';
                this.renderPost(post);
                
                // Update URL without page reload
                history.pushState({view: 'post', filename}, post.title, `?post=${filename}`);
            } else {
                console.error('Post not found or no content:', filename);
            }
        } catch (error) {
            console.error('Error loading post:', error);
        }
    }

    showPostView() {
        const container = document.getElementById('blog-posts');
        if (container) {
            container.innerHTML = `
                <article class="post-container">
                    <header class="post-header">
                        <h1 class="post-title">Loading...</h1>
                        <div class="post-meta">
                            <div class="post-date">
                                <i class="fas fa-calendar"></i>
                                <span>Loading...</span>
                            </div>
                            <div class="post-tags"></div>
                        </div>
                    </header>
                    <div class="post-content">
                        <p>Loading post content...</p>
                    </div>
                </article>
            `;
        }
    }

    renderPostLoading() {
        // Already handled in showPostView
    }

    renderPost(post) {
        const container = document.querySelector('.post-container');
        if (!container) return;

        // Update page title
        document.title = `${post.title} - Shenbaga Prasanna`;

        // Update post content
        const postTitle = container.querySelector('.post-title');
        if (postTitle) postTitle.textContent = post.title;

        const postDate = container.querySelector('.post-date span');
        if (postDate) postDate.textContent = post.date;

        const tagsContainer = container.querySelector('.post-tags');
        if (tagsContainer && post.tags) {
            tagsContainer.innerHTML = post.tags.map(tag => 
                `<span class="tag">${tag}</span>`
            ).join('');
        }

        const contentContainer = container.querySelector('.post-content');
        if (contentContainer) {
            contentContainer.innerHTML = post.content;
        }

        // Update sidebar for post view
        this.updateSidebarForPost();
    }

    showPostsList() {
        this.currentView = 'list';
        document.title = 'Blog - Shenbaga Prasanna';
        this.renderPostsList();
        this.resetSidebarForList();
        history.pushState({view: 'list'}, 'Blog', window.location.pathname);
    }

    resetSidebarForList() {
        // Reset back link to go to portfolio when in list view
        const backHome = document.querySelector('.back-home');
        if (backHome) {
            backHome.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Portfolio';
            backHome.onclick = null; // Remove custom click handler, use default href
        }
    }

    updateSidebar() {
        // Update tree view
        this.updateTreeView();

        // Update recent posts (latest 3)
        const recentContainer = document.getElementById('recent-posts');
        if (recentContainer) {
            const sortedPosts = [...this.posts].sort((a, b) => new Date(b.date) - new Date(a.date));
            const recentPosts = sortedPosts.slice(0, 3);
            recentContainer.innerHTML = recentPosts.map(post => `
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="blogApp.openPost('${post.filename}')">${post.title}</a>
                </li>
            `).join('');
        }
    }

    updateTreeView() {
        const categoriesContainer = document.querySelector('.nav-section .nav-list');
        if (!categoriesContainer) return;

        // Group posts by year, month, date
        const postTree = {};
        
        this.posts.forEach(post => {
            const date = new Date(post.date);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'long' });
            const day = date.getDate();
            
            if (!postTree[year]) postTree[year] = {};
            if (!postTree[year][month]) postTree[year][month] = {};
            if (!postTree[year][month][day]) postTree[year][month][day] = [];
            
            postTree[year][month][day].push(post);
        });

        // Build tree HTML
        let treeHTML = '<li class="nav-item"><a href="#" class="nav-link active" data-category="all">All Posts</a></li>';
        
        // Sort years in descending order
        const sortedYears = Object.keys(postTree).sort((a, b) => b - a);
        
        sortedYears.forEach(year => {
            treeHTML += `
                <li class="nav-item tree-item">
                    <div class="tree-node" onclick="blogApp.toggleTreeNode(this)">
                        <i class="fas fa-chevron-right tree-icon"></i>
                        <span>${year}</span>
                    </div>
                    <ul class="tree-children" style="display: none;">
            `;
            
            // Sort months chronologically
            const months = Object.keys(postTree[year]);
            const sortedMonths = months.sort((a, b) => {
                const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 'December'];
                return monthOrder.indexOf(b) - monthOrder.indexOf(a);
            });
            
            sortedMonths.forEach(month => {
                treeHTML += `
                    <li class="nav-item tree-item">
                        <div class="tree-node" onclick="blogApp.toggleTreeNode(this)">
                            <i class="fas fa-chevron-right tree-icon"></i>
                            <span>${month}</span>
                        </div>
                        <ul class="tree-children" style="display: none;">
                `;
                
                // Sort days in descending order
                const sortedDays = Object.keys(postTree[year][month]).sort((a, b) => b - a);
                
                sortedDays.forEach(day => {
                    postTree[year][month][day].forEach(post => {
                        treeHTML += `
                            <li class="nav-item tree-leaf">
                                <a href="#" class="nav-link tree-post" onclick="blogApp.openPost('${post.filename}')">
                                    <span class="tree-date">${day}</span>
                                    <span class="tree-title">${post.title}</span>
                                </a>
                            </li>
                        `;
                    });
                });
                
                treeHTML += '</ul></li>';
            });
            
            treeHTML += '</ul></li>';
        });
        
        categoriesContainer.innerHTML = treeHTML;
    }

    toggleTreeNode(element) {
        const icon = element.querySelector('.tree-icon');
        const children = element.nextElementSibling;
        
        if (children && children.classList.contains('tree-children')) {
            if (children.style.display === 'none') {
                children.style.display = 'block';
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-down');
            } else {
                children.style.display = 'none';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-right');
            }
        }
    }

    updateSidebarForPost() {
        // Update back link to go to blog home instead of portfolio
        const backHome = document.querySelector('.back-home');
        if (backHome) {
            backHome.innerHTML = '<i class="fas fa-arrow-left"></i> Home';
            backHome.onclick = (e) => {
                e.preventDefault();
                this.showPostsList();
            };
        }
    }

    setupEventListeners() {
        // Category filtering
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-category]')) {
                e.preventDefault();
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                
                const category = e.target.dataset.category;
                const posts = document.querySelectorAll('.blog-post');
                
                posts.forEach(post => {
                    if (category === 'all' || post.dataset.category === category) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handleRouting();
        });
    }

    handleRouting() {
        const urlParams = new URLSearchParams(window.location.search);
        const postParam = urlParams.get('post');
        
        if (postParam) {
            this.openPost(postParam);
        } else {
            this.showPostsList();
        }
    }
}

// Initialize blog app
const blogApp = new BlogApp();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    blogApp.init();
});

// Legacy function for compatibility
function openPost(filename) {
    blogApp.openPost(filename);
}
