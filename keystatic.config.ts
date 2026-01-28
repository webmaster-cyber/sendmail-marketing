import { config, fields, collection, singleton } from '@keystatic/core'

const colorField = (label: string, description: string, defaultValue: string) =>
  fields.text({
    label,
    description,
    defaultValue,
  })

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage',
      format: 'json',
      schema: {
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle', multiline: true }),
        heroCta: fields.text({ label: 'Hero CTA Text' }),
        heroCtaLink: fields.text({ label: 'Hero CTA Link' }),
        featuresTitle: fields.text({ label: 'Features Section Title' }),
        featuresSubtitle: fields.text({ label: 'Features Section Subtitle' }),
        ctaTitle: fields.text({ label: 'CTA Section Title' }),
        ctaSubtitle: fields.text({ label: 'CTA Section Subtitle' }),
      },
    }),
    about: singleton({
      label: 'About Page',
      path: 'src/content/about',
      format: 'json',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        subtitle: fields.text({ label: 'Page Subtitle', multiline: true }),
        story: fields.text({ label: 'Our Story', multiline: true }),
        mission: fields.text({ label: 'Our Mission', multiline: true }),
        values: fields.array(
          fields.object({
            title: fields.text({ label: 'Value Title' }),
            description: fields.text({ label: 'Description' }),
          }),
          {
            label: 'Values',
            itemLabel: (props) => props.fields.title.value || 'New Value',
          }
        ),
      },
    }),
    contact: singleton({
      label: 'Contact Page',
      path: 'src/content/contact',
      format: 'json',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        subtitle: fields.text({ label: 'Page Subtitle' }),
        email: fields.text({ label: 'Email Address' }),
        phone: fields.text({ label: 'Phone Number' }),
        address: fields.text({ label: 'Address', multiline: true }),
        hours: fields.text({ label: 'Business Hours' }),
      },
    }),
    settings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings',
      format: 'json',
      schema: {
        siteName: fields.text({ label: 'Site Name' }),
        siteDescription: fields.text({ label: 'Site Description', multiline: true }),
        appUrl: fields.text({ label: 'App URL', description: 'URL to the main application (e.g. https://app.sendmail.co.zw)' }),
        apiUrl: fields.text({ label: 'API URL', description: 'URL to fetch plans from (e.g. https://app.sendmail.co.zw)' }),
        signupId: fields.text({ label: 'Signup ID', description: 'The signup settings ID for building signup links' }),
        contactEmail: fields.text({ label: 'Contact Email' }),
        socialTwitter: fields.text({ label: 'Twitter URL' }),
        socialLinkedin: fields.text({ label: 'LinkedIn URL' }),
        logo: fields.image({
          label: 'Logo',
          description: 'Main logo for header (recommended: SVG or PNG with transparent background)',
          directory: 'public/branding',
          publicPath: '/branding/',
        }),
        logoWhite: fields.image({
          label: 'Logo (White/Light)',
          description: 'Logo for dark backgrounds like footer',
          directory: 'public/branding',
          publicPath: '/branding/',
        }),
        favicon: fields.image({
          label: 'Favicon',
          description: 'Browser tab icon (recommended: 32x32 PNG or ICO)',
          directory: 'public/branding',
          publicPath: '/branding/',
        }),
        colorPrimary: colorField('Primary Color', 'Main brand color (hex, e.g. #006FC2)', '#006FC2'),
        colorPrimaryHover: colorField('Primary Hover Color', 'Hover state for primary color (hex)', '#005a9e'),
        colorDark: colorField('Dark Text Color', 'Color for headings and dark text (hex)', '#1a2332'),
        // SEO
        ogImage: fields.image({
          label: 'Social Share Image',
          description: 'Default image for social media sharing (recommended: 1200x630px PNG or JPG)',
          directory: 'public/branding',
          publicPath: '/branding/',
        }),
        twitterHandle: fields.text({
          label: 'Twitter Handle',
          description: 'Twitter/X username without @ (e.g. sendmailzw)',
        }),
        googleVerification: fields.text({
          label: 'Google Site Verification',
          description: 'Google Search Console verification code (just the code, not the full meta tag)',
        }),
      },
    }),
    seo: singleton({
      label: 'Page SEO',
      path: 'src/content/seo',
      format: 'json',
      schema: {
        homeTitle: fields.text({ label: 'Homepage Title', description: 'SEO title for homepage' }),
        homeDescription: fields.text({ label: 'Homepage Description', description: 'Meta description for homepage', multiline: true }),
        featuresTitle: fields.text({ label: 'Features Page Title' }),
        featuresDescription: fields.text({ label: 'Features Page Description', multiline: true }),
        pricingTitle: fields.text({ label: 'Pricing Page Title' }),
        pricingDescription: fields.text({ label: 'Pricing Page Description', multiline: true }),
        aboutTitle: fields.text({ label: 'About Page Title' }),
        aboutDescription: fields.text({ label: 'About Page Description', multiline: true }),
        contactTitle: fields.text({ label: 'Contact Page Title' }),
        contactDescription: fields.text({ label: 'Contact Page Description', multiline: true }),
      },
    }),
  },
  collections: {
    features: collection({
      label: 'Features',
      slugField: 'title',
      path: 'src/content/features/*',
      format: 'json',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        icon: fields.select({
          label: 'Icon',
          options: [
            { label: 'Mail', value: 'mail' },
            { label: 'Users', value: 'users' },
            { label: 'Chart', value: 'chart' },
            { label: 'Zap', value: 'zap' },
            { label: 'Shield', value: 'shield' },
            { label: 'Clock', value: 'clock' },
            { label: 'Globe', value: 'globe' },
            { label: 'Code', value: 'code' },
          ],
          defaultValue: 'mail',
        }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: 'json',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role/Company' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/avatars',
          publicPath: '/avatars/',
        }),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'src/content/faqs/*',
      format: 'json',
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({ label: 'Answer', multiline: true }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),
    featureGroups: collection({
      label: 'Feature Groups',
      slugField: 'title',
      path: 'src/content/feature-groups/*',
      format: 'json',
      schema: {
        title: fields.slug({ name: { label: 'Group Title' } }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: 'Feature Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Mail', value: 'mail' },
                { label: 'Users', value: 'users' },
                { label: 'Chart', value: 'chart' },
                { label: 'Zap', value: 'zap' },
                { label: 'Shield', value: 'shield' },
                { label: 'Clock', value: 'clock' },
                { label: 'Globe', value: 'globe' },
                { label: 'Code', value: 'code' },
              ],
              defaultValue: 'mail',
            }),
          }),
          {
            label: 'Features',
            itemLabel: (props) => props.fields.title.value || 'New Feature',
          }
        ),
      },
    }),
  },
})
