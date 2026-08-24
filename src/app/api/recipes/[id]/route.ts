import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth/verifyAdmin';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // C3: Verify admin authentication
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();
    
    const { error } = await supabaseAdmin
      .from('recipes')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Supabase error deleting recipe:', error);
      return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/recipes/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // C3: Verify admin authentication
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();
    const updateData = await request.json();

    // H5: Input validation
    if (updateData.title !== undefined && (typeof updateData.title !== 'string' || updateData.title.trim().length === 0)) {
      return NextResponse.json({ error: 'Recipe title cannot be empty' }, { status: 400 });
    }

    if (updateData.payoutRate !== undefined) {
      const rate = parseFloat(updateData.payoutRate);
      if (isNaN(rate) || rate < 0 || rate > 10000) {
        return NextResponse.json({ error: 'Payout rate must be between 0 and 10000' }, { status: 400 });
      }
    }
    
    // Map camelCase to snake_case for DB with explicit field allowlist
    const dbUpdateData: Record<string, unknown> = {};
    if (updateData.code !== undefined) dbUpdateData.code = updateData.code;
    if (updateData.title !== undefined) dbUpdateData.title = String(updateData.title).trim();
    if (updateData.environment !== undefined) dbUpdateData.environment = updateData.environment;
    if (updateData.hardwareRig !== undefined) dbUpdateData.hardware_rig = updateData.hardwareRig;
    if (updateData.estimatedTime !== undefined) dbUpdateData.estimated_time = updateData.estimatedTime;
    if (updateData.payoutRate !== undefined) dbUpdateData.payout_rate = parseFloat(updateData.payoutRate);
    if (updateData.description !== undefined) dbUpdateData.description = updateData.description;
    if (updateData.targetFps !== undefined) dbUpdateData.target_fps = parseInt(updateData.targetFps);
    if (updateData.expectedDurationSec !== undefined) dbUpdateData.expected_duration_sec = parseInt(updateData.expectedDurationSec);
    if (updateData.difficulty !== undefined) dbUpdateData.difficulty = updateData.difficulty;
    if (updateData.requiredObjects !== undefined) dbUpdateData.required_objects = Array.isArray(updateData.requiredObjects) ? updateData.requiredObjects : [];
    if (updateData.tags !== undefined) dbUpdateData.tags = Array.isArray(updateData.tags) ? updateData.tags : [];

    if (Object.keys(dbUpdateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('recipes')
      .update(dbUpdateData)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Supabase error updating recipe:', error);
      return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
    
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in PUT /api/recipes/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
