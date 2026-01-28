# SendMail Marketing Site

Marketing website for SendMail email marketing platform. Built with [Astro](https://astro.build/) and [Keystatic CMS](https://keystatic.com/).

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Configure `.env`:

- `PUBLIC_APP_URL` - URL to the main SendMail application (e.g., `https://app.sendmail.co.zw`)
- `PUBLIC_API_URL` - URL for API calls, usually same as app URL
- `PUBLIC_SIGNUP_ID` - The signup settings ID from the admin panel (found at `/admin/signup`)

4. Start development server:

```bash
npm run dev
```

5. Access:
   - Site: http://localhost:4321
   - CMS: http://localhost:4321/keystatic

## Pages

- `/` - Homepage with hero, features, and CTA
- `/pricing` - Pricing page (fetches plans from API)
- `/features` - Detailed features page
- `/keystatic` - CMS admin interface

## Content Management

Edit content through the Keystatic CMS at `/keystatic`:

- **Homepage** - Hero text, section titles
- **Settings** - Site name, URLs, contact info
- **Features** - Feature cards (icon, title, description)
- **Testimonials** - Customer quotes
- **FAQs** - Frequently asked questions

## Deployment

### Cloudflare Pages

```bash
npm run build
```

Deploy the `dist/` folder to Cloudflare Pages.

Set environment variables in the Cloudflare dashboard.

### Netlify

Connect your repo to Netlify. It will auto-detect Astro.

Set environment variables in Site settings > Environment variables.

## API Integration

The pricing page fetches plans from `/api/public/plans` on the main app. This endpoint returns:

```json
[
  {
    "id": "...",
    "name": "Starter",
    "slug": "starter",
    "description": "Perfect for getting started",
    "price_usd": 0,
    "price_zwl": 0,
    "billing_period": "monthly",
    "subscriber_limit": 500,
    "send_limit_monthly": 1000,
    "features": [
      { "name": "Email broadcasts", "included": true },
      { "name": "Automation", "included": false }
    ],
    "trial_days": 0,
    "is_free": true
  }
]
```

Signup links point to: `{APP_URL}/signup/{SIGNUP_ID}?plan={plan.slug}`
