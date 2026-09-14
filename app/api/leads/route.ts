import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, plan } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Replace this console log with your database save call (e.g., Supabase, Prisma, etc.)
    console.log(`[Lead Captured] Email: ${email}, Plan: ${plan}`);

    return NextResponse.json(
      { message: 'Lead captured successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}