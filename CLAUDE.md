# Ismael M. Portfolio Website

A modern, professional portfolio built with Next.js 15+, TypeScript, and Tailwind CSS v4.

## Project Structure

```
portifolio/
├── app/
│   ├── layout.tsx              # Root layout with Navigation and Footer
│   ├── page.tsx                # Home/About page
│   ├── globals.css             # Global styles with Tailwind design tokens
│   ├── blog/
│   │   ├── page.tsx            # Blog listing page with search/filtering
│   │   └── [slug]/page.tsx     # Individual blog post page
│   ├── projects/
│   │   └── page.tsx            # Projects showcase page
│   ├── contact/
│   │   └── page.tsx            # Contact form page
│   └── actions.ts              # Server Actions for form handling
├── components/
│   ├── Navigation.tsx          # Header with responsive navigation
│   ├── Footer.tsx              # Footer component
│   ├── BlogCard.tsx            # Blog post card component
│   ├── BlogSearch.tsx          # Blog search/filter component
│   ├── ProjectCard.tsx         # Project card component
│   └── ContactForm.tsx         # Contact form with validation
├── lib/
│   └── data/
│       ├── index.ts            # Data exports
│       ├── projects.ts         # Mock projects data
│       ├── blog-posts.ts       # Mock blog posts data
│       └── contact.ts          # Contact information
├── package.json                # Dependencies
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── vercel.json                 # Vercel deployment configuration
└── README.md                   # User-facing documentation
```

## Development

### Setup
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Build
```bash
npm run build
npm start
```

## Key Technologies

- **Next.js 15+** with App Router for modern routing and server components
- **TypeScript** (strict mode) for type safety
- **Tailwind CSS v4** with `@theme` for design tokens
- **React Server Components** by default for performance
- **Server Actions** for form handling (no API routes needed)
- **Mock data** in TypeScript files for flexibility

## Design System

### Colors (CSS Variables)
All colors are defined in `app/globals.css` under `@theme` and available as Tailwind utilities:

- `--color-brand-*` (50-950): Indigo accent colors
- `--color-surface`: White background
- `--color-text-primary`: Dark text
- `--color-text-secondary`: Gray text
- `--color-border`: Light border color
- `--color-red-500`: Error/destructive color

### Components
Reusable components are defined in `@layer components` in `globals.css`:

- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`: Button variants
- `.card`, `.card-sm`: Card containers
- `.input`, `.input-error`: Form inputs
- `.label`: Form labels
- `.badge`: Tag/badge components
- `.container-section`: Main layout container
- `.prose`: Blog post content styling

### Responsive Design
Mobile-first approach using Tailwind breakpoints:
- Mobile: default
- Tablet: `md:` (640px+)
- Desktop: `lg:` (1024px+)

## Data Management

### Blog Posts
Mock data in `lib/data/blog-posts.ts`:
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown
  tags: string[];
  publishedAt: string; // ISO 8601
}
```

To add a new post:
1. Add entry to `blogPosts` array in `lib/data/blog-posts.ts`
2. Content can include Markdown (parsed with `marked` library)
3. Update blog pages automatically

### Projects
Mock data in `lib/data/projects.ts`:
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  repository: string;
  liveUrl?: string;
  tags: string[];
  featured?: boolean;
}
```

To add a new project:
1. Add entry to `projects` array in `lib/data/projects.ts`
2. Projects display automatically on `/projects`

### Contact Info
Contact details in `lib/data/contact.ts`:
```typescript
interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
}
```

Update `contactInfo` object to change contact details.

## Form Handling

The contact form uses **Server Actions** for secure, simple form handling:

1. **Client-side validation** in `components/ContactForm.tsx` for instant feedback
2. **Server-side validation** in `app/actions.ts` for security
3. **Mock submission** logs to console and returns success message
4. **No email sending** — ready for integration with a backend service

To implement real email sending:
1. Update `submitContactForm()` in `app/actions.ts`
2. Add email service (SendGrid, Postmark, etc.)
3. Set environment variables for API keys

## Image Optimization

Next.js `<Image>` component is used throughout for:
- Automatic WebP/AVIF conversion
- Responsive image serving
- Lazy loading
- Built-in optimization

Examples:
```typescript
import Image from 'next/image';

<Image
  src="/image.png"
  alt="Description"
  width={800}
  height={600}
  responsive={true}
/>
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Automatic deployment on push to main
4. Preview deployments for pull requests

**Zero-config deployment**: Vercel auto-detects Next.js projects.

### Build Output
- Static HTML pages for all routes (except dynamic routes)
- Optimized images in `.next/static`
- JavaScript bundles split by route

## Performance

### Core Web Vitals
Target metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Lighthouse Audit
Run locally:
```bash
# Build the site
npm run build
npm start

# Then use Chrome DevTools > Lighthouse to audit
```

Target score: 90+ for Performance, Accessibility, Best Practices, SEO

## Testing & Quality

### Development
- TypeScript strict mode catches type errors
- ESLint configured for code quality
- Mobile-first responsive design

### Pre-deployment
1. Build locally: `npm run build`
2. Test production build: `npm start`
3. Run Lighthouse audit
4. Test on real devices (mobile, tablet, desktop)
5. Test across browsers (Chrome, Firefox, Safari, Edge)

## SEO & Metadata

Metadata configured in `app/layout.tsx`:
- Dynamic page titles with template
- Site description
- Open Graph metadata
- Canonical URLs (Vercel auto-configures)

Each page can override with `export const metadata` in its route file.

## Accessibility (WCAG 2.1 AA)

Built-in features:
- Semantic HTML structure
- Color contrast ratios meet WCAG AA
- Keyboard navigation with visible focus rings
- ARIA labels on interactive elements
- Mobile-responsive design
- Skip links on Navigation

Test with:
- Chrome DevTools > Lighthouse
- axe DevTools browser extension
- Manual keyboard navigation (Tab, Enter, Escape)

## Maintenance

### Adding Content
- **Blog post**: Add to `lib/data/blog-posts.ts`
- **Project**: Add to `lib/data/projects.ts`
- **Contact info**: Update `lib/data/contact.ts`

### Updating Styles
- Design tokens: Edit `app/globals.css` `@theme` block
- Component styles: Edit in `@layer components`
- Page-specific styles: Use Tailwind utility classes in components

### Common Tasks
```bash
# Development server
npm run dev

# Build and test production
npm run build && npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Dependencies

- **next@16.2.2**: Framework
- **react@19.2.4**: UI library
- **tailwindcss@4**: Styling
- **marked@17.0.6**: Markdown parsing for blog posts
- **typescript@5**: Type safety

Dev dependencies support Tailwind v4, TypeScript, ESLint, and type definitions.

## Deployment Notes

- **Environment variables**: None required for basic functionality
- **Database**: Not needed (mock data in files)
- **API**: Server Actions handle form submission
- **Build time**: Typically < 30 seconds
- **Bundle size**: Optimized by Next.js (code splitting, tree-shaking)

### Vercel-specific
- Automatic HTTPS
- Global CDN with edge caching
- Automatic Lighthouse scoring in deployments
- Preview deployments for all pull requests
- Analytics and monitoring

## Future Enhancements

Consider adding when needed:
- Real email sending for contact form
- Blog post images with Image component
- Newsletter signup integration
- Analytics (Vercel Analytics or similar)
- API route for advanced form handling
- Database for dynamic content
- Search functionality (server-side)
