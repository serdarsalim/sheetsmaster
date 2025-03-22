import { NextResponse } from 'next/server';
import { getTemplates } from '@/app/lib/templates-server';

export async function GET() {
  try {
    const templates = await getTemplates();
    
    // Set appropriate cache headers
    return NextResponse.json(templates, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}