export async function GET() {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': '2' },
  });
}