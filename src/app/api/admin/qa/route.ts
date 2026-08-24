import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth/verifyAdmin';

export async function POST(request: Request) {
  try {
    // C3: Verify admin authentication
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, qaScore, qaFeedback } = body;

    // H5: Input validation
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid submission ID' }, { status: 400 });
    }

    if (!status || !['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status. Must be APPROVED, REJECTED, or PENDING' }, { status: 400 });
    }

    if (qaScore !== undefined) {
      const score = Number(qaScore);
      if (isNaN(score) || score < 0 || score > 100) {
        return NextResponse.json({ error: 'QA score must be between 0 and 100' }, { status: 400 });
      }
    }

    if (qaFeedback !== undefined && typeof qaFeedback !== 'string') {
      return NextResponse.json({ error: 'QA feedback must be a string' }, { status: 400 });
    }

    if (qaFeedback && qaFeedback.length > 5000) {
      return NextResponse.json({ error: 'QA feedback is too long (max 5000 chars)' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // H8: Use actual admin username from JWT for audit trail
    const qaReviewer = admin.username || 'Admin';

    const updates: Record<string, unknown> = {
      status,
      qa_reviewer: qaReviewer,
    };

    if (qaScore !== undefined) {
      updates.qa_score = Number(qaScore);
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
