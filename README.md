# Ismael M. — Professional Portfolio Website

A modern, elegant portfolio website for a senior backend engineer. Built with Next.js 15+, TypeScript, Tailwind CSS v4, and deployed to Vercel for automatic scaling and zero-downtime deployments.

## Features

✨ **Modern & Fast**
- Next.js 15+ with App Router for optimal performance
- Server Components by default (no unnecessary JavaScript)
- Lighthouse score 90+
- Core Web Vitals optimized

🎨 **Beautiful Design**
- Clean, professional aesthetic reflecting engineering excellence
- Tailwind CSS v4 with custom design tokens
- Fully responsive (mobile, tablet, desktop)
- Dark mode ready (light theme default)

📱 **Fully Responsive**
- Mobile-first design approach
- Tested on all screen sizes
- Touch-friendly interactions
- Fast on slow networks

♿ **Accessible**
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Color contrast ratios verified

🔒 **Secure**
- Server-side form validation
- No sensitive data exposed to client
- Content Security Policy ready
- HTTPS everywhere on Vercel

🚀 **Easy to Deploy**
- Zero-config deployment on Vercel
- Automatic preview deployments for PRs
- Built-in analytics and monitoring
- Global CDN with edge caching

## Pages

- **Home** — About section, technical skills, call-to-action
- **Projects** — Showcase of your best work with links to repositories
- **Blog** — Technical writing with search and tag filtering
- **Contact** — Contact form and direct communication links
- **Navigation** — Sticky header with responsive mobile menu

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ismaelm/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

## Development

### Available Scripts

```bash
# Development server (hot reload)
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Run linting
npm run lint
```

### Project Structure

```
app/
├── page.tsx              # Home page
├── projects/page.tsx     # Projects listing
├── blog/page.tsx         # Blog listing with search
├── blog/[slug]/page.tsx  # Individual blog posts
├── contact/page.tsx      # Contact form
└── layout.tsx            # Root layout

lib/data/
├── projects.ts           # Mock projects data
├── blog-posts.ts         # Mock blog posts (Markdown)
└── contact.ts            # Contact information

components/              # Reusable React components
```

## Customization

### Update Contact Information
Edit `lib/data/contact.ts`:
```typescript
export const contactInfo: ContactInfo = {
  email: "your@email.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://x.com/yourusername",
};
```

### Add Projects
Edit `lib/data/projects.ts` and add to the `projects` array:
```typescript
{
  id: "project-id",
  name: "Project Name",
  description: "Brief description",
  repository: "https://github.com/user/project",
  liveUrl: "https://project.com",
  tags: ["TypeScript", "PostgreSQL", "Docker"],
  featured: true,
}
```

### Add Blog Posts
Edit `lib/data/blog-posts.ts` and add to the `blogPosts` array:
```typescript
{
  id: "post-id",
  slug: "post-title",
  title: "Post Title",
  excerpt: "Brief excerpt shown in listing",
  content: "# Markdown content here...",
  tags: ["Backend", "Performance"],
  publishedAt: "2026-04-06",
}
```

### Customize Design
Edit `app/globals.css` to modify:
- Colors (brand, surfaces, text) under `@theme`
- Button styles, card styles, form styles
- Component layer utilities

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click "Deploy"

3. **Configure Custom Domain** (optional)
   - In Vercel dashboard → Settings → Domains
   - Add your domain and configure DNS

**That's it!** Vercel will automatically:
- Build on every push
- Deploy instantly
- Create preview deployments for PRs
- Monitor performance with Lighthouse

### Deploy to Other Platforms

The site is a standard Next.js 15 project and can be deployed to:
- **Netlify** (supports Next.js)
- **AWS Amplify**
- **Railway**
- **Heroku** (with buildpack)
- Any Node.js hosting

Build command: `npm run build`
Start command: `npm start`

## Performance

### Lighthouse Audits
Run locally to check performance:
```bash
npm run build
npm start
# Then use Chrome DevTools → Lighthouse
```

Target scores: **90+** for Performance, Accessibility, Best Practices, SEO

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms  
- **CLS** (Cumulative Layout Shift): < 0.1

## Content Guidelines

### Blog Posts
- Write in Markdown format
- Use `publishedAt` in ISO 8601 format (YYYY-MM-DD)
- Tags help with filtering and discovery
- Content supports headings, lists, code blocks, tables

### Projects
- Keep descriptions concise (1-2 sentences)
- Include relevant tags (languages, frameworks, tools)
- Mark important projects as `featured: true`
- Provide GitHub repository URL

## Browser Support

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

The site follows WCAG 2.1 AA guidelines:
- Semantic HTML structure
- Color contrast ratios meet standards
- Keyboard navigation fully supported
- Focus indicators visible on all interactive elements
- Images have descriptive alt text
- Forms have proper labels and error messages

Test with:
- Chrome DevTools → Lighthouse → Accessibility
- axe DevTools browser extension
- Manual keyboard navigation (Tab key)

## Future Enhancements

Consider adding when needed:
- Newsletter signup integration
- Real email sending for contact form (with SendGrid, Postmark, etc.)
- Dark mode toggle
- Blog post search with server-side indexing
- Analytics dashboard
- Dynamic content with a CMS (Sanity, Strapi, etc.)
- Comments on blog posts

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### TypeScript Errors
```bash
# Type-check your code
npx tsc --noEmit
```

## Support

For help with:
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Vercel Deployment**: [vercel.com/docs](https://vercel.com/docs)

## License

This project is yours to use, modify, and deploy. Feel free to use it as a starting point for your own portfolio.

---

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**

[Visit the Portfolio](https://ismaelm.dev) • [View on GitHub](https://github.com/ismaelm/portfolio)
