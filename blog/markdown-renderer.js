// Markdown Renderer using marked.js library
class MarkdownRenderer {
    constructor() {
        this.posts = [];
        this.currentPost = null;
    }

    // Parse markdown frontmatter and content
    parseMarkdown(markdownText) {
        const lines = markdownText.split('\n');
        let frontmatterEnd = -1;
        let frontmatter = {};
        
        // Check if file starts with frontmatter
        if (lines[0] === '---') {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i] === '---') {
                    frontmatterEnd = i;
                    break;
                }
                
                // Parse frontmatter
                const line = lines[i].trim();
                if (line.includes(':')) {
                    const [key, ...valueParts] = line.split(':');
                    let value = valueParts.join(':').trim();
                    
                    // Handle arrays (tags)
                    if (value.startsWith('[') && value.endsWith(']')) {
                        value = value.slice(1, -1).split(',').map(tag => tag.trim().replace(/['"]/g, ''));
                    }
                    // Remove quotes from strings
                    else if ((value.startsWith('"') && value.endsWith('"')) || 
                             (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    
                    frontmatter[key.trim()] = value;
                }
            }
        }
        
        // Get content after frontmatter
        const content = lines.slice(frontmatterEnd + 1).join('\n');
        
        return {
            frontmatter,
            content: marked.parse(content)
        };
    }

    // Load and render a markdown post
    async loadPost(filename) {
        try {
            const response = await fetch(`posts/${filename}`);
            const markdownText = await response.text();
            const parsed = this.parseMarkdown(markdownText);
            
            this.currentPost = {
                filename,
                ...parsed.frontmatter,
                content: parsed.content
            };
            
            return this.currentPost;
        } catch (error) {
            console.error('Error loading post:', error);
            return null;
        }
    }

    // Render post to the page
    renderPost(post) {
        const container = document.querySelector('.post-container');
        if (!container) return;

        // Update title
        document.title = `${post.title} - Shenbaga Prasanna`;
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && post.description) {
            metaDesc.setAttribute('content', post.description);
        }

        // Render post header
        const postTitle = container.querySelector('.post-title');
        if (postTitle) postTitle.textContent = post.title;

        const postDate = container.querySelector('.post-date span');
        if (postDate) postDate.textContent = post.date;

        // Render tags
        const tagsContainer = container.querySelector('.post-tags');
        if (tagsContainer && post.tags) {
            tagsContainer.innerHTML = post.tags.map(tag => 
                `<span class="tag">${tag}</span>`
            ).join('');
        }

        // Render content
        const contentContainer = container.querySelector('.post-content');
        if (contentContainer) {
            contentContainer.innerHTML = post.content;
        }
    }

    // Load posts list for blog index
    async loadPostsList() {
        try {
            const response = await fetch('posts/posts.json');
            const postsData = await response.json();
            this.posts = postsData.posts || [];
            return this.posts;
        } catch (error) {
            console.error('Error loading posts list:', error);
            return [];
        }
    }

    // Render posts list on blog index
    renderPostsList(posts) {
        const container = document.getElementById('blog-posts');
        if (!container) return;

        if (posts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <h3>No posts yet</h3>
                    <p>Blog posts will appear here when added.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = posts.map(post => `
            <article class="blog-post" data-category="${post.category || 'general'}" onclick="openPost('${post.filename}')">
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

        // Update categories in sidebar
        this.updateCategories(posts);
        this.updateRecentPosts(posts);
    }

    // Update categories in sidebar
    updateCategories(posts) {
        const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
        const categoriesContainer = document.querySelector('.nav-section .nav-list');
        
        if (categoriesContainer && categories.length > 0) {
            const allPostsItem = categoriesContainer.querySelector('[data-category="all"]').parentElement;
            categoriesContainer.innerHTML = '';
            categoriesContainer.appendChild(allPostsItem);
            
            categories.forEach(category => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `<a href="#" class="nav-link" data-category="${category}">${category}</a>`;
                categoriesContainer.appendChild(li);
            });
        }
    }

    // Update recent posts in sidebar
    updateRecentPosts(posts) {
        const recentContainer = document.getElementById('recent-posts');
        if (!recentContainer) return;

        const recentPosts = posts.slice(0, 5);
        recentContainer.innerHTML = recentPosts.map(post => `
            <li class="nav-item">
                <a href="#" class="nav-link" onclick="openPost('${post.filename}')">${post.title}</a>
            </li>
        `).join('');
    }
}

// Initialize renderer
const renderer = new MarkdownRenderer();

// Remove auto-load functionality since BlogApp handles it
// The MarkdownRenderer class is still available for BlogApp to use
