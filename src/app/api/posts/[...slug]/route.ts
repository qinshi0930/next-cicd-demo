import { fetchFileFromRepo } from '@/lib/github';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const path = (await params).slug.join('/'); // e.g., ['docs', 'guide.md']

    const content = await fetchFileFromRepo(path);
    return new Response(content, {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to fetch file:', error);
    return new Response('File not found or access denied', { status: 404 });
  }
}