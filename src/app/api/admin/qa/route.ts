import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { id, status, qaScore, qaFeedback } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Since we don't have the admin user's name directly easily accessible here without decoding the JWT again,
    // we'll just put "System Admin" or try to decode it. Let's just use System Admin.
    const qaReviewer = 'System Admin';

    const updates: any = {
      status,
      qa_reviewer: qaReviewer,
    };

    if (qaScore !== undefined) {
      updates.qa_score = qaScore;
    }

    if (qaFeedback !== undefined) {
      updates.qa_feedback = qaFeedback;
      if (status === 'REJECTED') {
        updates.rejection_reason = qaFeedback;
      }
    }

    const { error } = await supabase
      .from('submissions')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('QA update error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('QA API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
