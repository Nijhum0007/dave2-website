import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth/verifyAdmin';
import { Recipe } from '@/lib/types';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Supabase error fetching recipes:', error);
      return NextResponse.json({ error: 'Failed to load recipes' }, { status: 500 });
    }

    // Convert snake_case from DB back to camelCase for the frontend
    const formattedRecipes: Recipe[] = (recipes || []).map(r => ({
      id: r.id,
      code: r.code,
      title: r.title,
      environment: r.environment,
      hardwareRig: r.hardware_rig,
      estimatedTime: r.estimated_time,
      payoutRate: Number(r.payout_rate),
      description: r.description,
      targetFps: r.target_fps,
      expectedDurationSec: r.expected_duration_sec,
      acceptanceRate: Number(r.acceptance_rate),
      difficulty: r.difficulty,
      requiredObjects: r.required_objects,
      tags: r.tags
    }));

    return NextResponse.json(formattedRecipes);
  } catch (error) {
    console.error('Failed to read recipes data:', error);
    return NextResponse.json({ error: 'Failed to load recipes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // C3: Verify admin authentication before allowing recipe creation
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAdmin = createAdminClient();
    const newRecipeData = await request.json();
    
    // H5: Input validation
    if (!newRecipeData.title || typeof newRecipeData.title !== 'string' || newRecipeData.title.trim().length === 0) {
      return NextResponse.json({ error: 'Recipe title is required' }, { status: 400 });
    }

    if (newRecipeData.title.length > 200) {
      return NextResponse.json({ error: 'Recipe title is too long (max 200 chars)' }, { status: 400 });
    }

    if (newRecipeData.payoutRate !== undefined) {
      const rate = parseFloat(newRecipeData.payoutRate);
      if (isNaN(rate) || rate < 0 || rate > 10000) {
        return NextResponse.json({ error: 'Payout rate must be between 0 and 10000' }, { status: 400 });
      }
    }

    // L6: Use crypto.randomUUID() instead of Date.now() to prevent collisions
    const newId = crypto.randomUUID();
    
    const newRecipeRow = {
      id: newId,
      code: newRecipeData.code || `NEW-${Math.floor(Math.random() * 10000)}`,
      title: newRecipeData.title.trim(),
      environment: newRecipeData.environment || 'Household',
      hardware_rig: newRecipeData.hardwareRig || 'Tier 3 (Standard Phone)',
      estimated_time: newRecipeData.estimatedTime || '30 mins',
      payout_rate: parseFloat(newRecipeData.payoutRate) || 2.0,
      description: newRecipeData.description || '',
      target_fps: parseInt(newRecipeData.targetFps) || 30,
      expected_duration_sec: parseInt(newRecipeData.expectedDurationSec) || 60,
      acceptance_rate: 100.0,
      difficulty: newRecipeData.difficulty || 'Beginner',
      required_objects: Array.isArray(newRecipeData.requiredObjects) ? newRecipeData.requiredObjects : [],
      tags: Array.isArray(newRecipeData.tags) ? newRecipeData.tags : [],
    };
    
    const { error } = await supabaseAdmin
      .from('recipes')
      .insert(newRecipeRow);
      
    if (error) {
      console.error('Supabase error inserting recipe:', error);
      return NextResponse.json({ error: 'Failed to save recipe' }, { status: 500 });
    }
    
    // Return the camelCase version to the frontend so it can immediately render it
    const formattedRecipe: Recipe = {
      id: newRecipeRow.id,
      code: newRecipeRow.code,
      title: newRecipeRow.title,
      environment: newRecipeRow.environment as Recipe['environment'],
      hardwareRig: newRecipeRow.hardware_rig,
      estimatedTime: newRecipeRow.estimated_time,
      payoutRate: newRecipeRow.payout_rate,
      description: newRecipeRow.description,
      targetFps: newRecipeRow.target_fps,
      expectedDurationSec: newRecipeRow.expected_duration_sec,
      acceptanceRate: newRecipeRow.acceptance_rate,
      difficulty: newRecipeRow.difficulty as Recipe['difficulty'],
      requiredObjects: newRecipeRow.required_objects,
      tags: newRecipeRow.tags
    };
    
    return NextResponse.json(formattedRecipe, { status: 201 });
  } catch (error) {
    console.error('Failed to save recipe:', error);
    return NextResponse.json({ error: 'Failed to save recipe' }, { status: 500 });
  }
}
