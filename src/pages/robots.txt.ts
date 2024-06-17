export const prerender = true;

export async function GET() {
  const text = `
User-agent: *
Allow: /
Sitemap: https://sjrdesigns.com/sitemap-index.xml`.trim()

  return new Response(text)
}