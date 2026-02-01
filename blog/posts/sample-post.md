---
title: "Sample Blog Post"
date: "2026-01-02"
description: "This is a sample blog post demonstrating the markdown format"
category: "tutorial"
tags: ["markdown", "blog", "sample", "tutorial"]
excerpt: "Learn how to write blog posts in markdown format with frontmatter metadata"
---

# Sample Blog Post

This is a sample blog post written in **Markdown** format. It demonstrates how to structure your blog posts with frontmatter metadata and markdown content.

## Frontmatter Format

Each blog post should start with YAML frontmatter containing:

- `title`: The post title
- `date`: Publication date (YYYY-MM-DD format)
- `description`: Meta description for SEO
- `category`: Post category for filtering
- `tags`: Array of tags
- `excerpt`: Short description for post listing

## Markdown Features

### Headers

You can use different header levels:

# H1 Header
## H2 Header  
### H3 Header

### Text Formatting

- **Bold text** using `**bold**`
- *Italic text* using `*italic*`
- `Inline code` using backticks
- ~~Strikethrough~~ using `~~text~~`

### Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

### Code Blocks

```javascript
function example() {
    console.log("Hello, world!");
    return "This is a code block";
}
```

### Blockquotes

> This is a blockquote. It's useful for highlighting important information or quotes from other sources.

### Links

You can create [links to other pages](https://example.com) or reference other posts.

## Conclusion

This sample post shows the standard format for blog posts. Simply create a new `.md` file in the `posts/` directory following this structure, and it will be automatically rendered by the blog system.
