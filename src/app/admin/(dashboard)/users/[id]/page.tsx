import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import { ArrowLeft, User, Building2, MapPin, Hash, CheckCircle, Clock, Ban, DollarSign, Video, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function OperatorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = createAdminClient();
  const operatorId = (await params).id;

  // 1. Fetch Operator
  const { data: operator, error: opError } = await supabase
    .from('operators')
    .select('*')
    .eq('id', operatorId)
    .single();

  if (opError || !operator) {
    notFound();
  }

  // 2. Fetch Submissions
  const { data: submissions } = await supabase
    .from('submissions')
    .select('*')
    .eq('operator_id', operatorId);

  const safeSubmissions = submissions || [];

  // 3. Fetch Recipes to get payout rates
  const { data: recipes } = await supabase
    .from('recipes')
    .select('id, payout_rate');

  const recipeMap = new Map((recipes || []).map(r => [r.id, r.payout_rate]));

  // 4. Fetch Payouts
  const { data: payouts } = await supabase
    .from('payouts')
    .select('*')
    .eq('operator_id', operatorId)
    .order('created_at', { ascending: false });

  const safePayouts = payouts || [];

  // --- Calculations ---
  const approvedSubmissions = safeSubmissions.filter(s => s.status === 'APPROVED');
  const pendingSubmissions = safeSubmissions.filter(s => s.status === 'PENDING');
  
  // Calculate Lifetime Earnings (sum of all approved)
  const lifetimeEarnings = approvedSubmissions.reduce((acc, sub) => {
    return acc + (recipeMap.get(sub.recipe_id) || 0);
  }, 0);

  // Calculate Outstanding Due (approved but not paid)
  const outstandingSubmissions = approvedSubmissions.filter(s => !s.is_paid);
  const outstandingDue = outstandingSubmissions.reduce((acc, sub) => {
    return acc + (recipeMap.get(sub.recipe_id) || 0);
  }, 0);

  // Calculate Paid Earnings
  const paidEarnings = safePayouts.filter(p => p.status === 'PAID').reduce((acc, p) => acc + Number(p.amount), 0);


  // --- Server Actions ---
  async function processPayoutAction() {
    "use server";
    const supabaseServer = createAdminClient();
    
    // Recalculate server-side for safety
    const { data: serverSubs } = await supabaseServer
      .from('submissions')
      .select('*')
      .eq('operator_id', operatorId)
      .eq('status', 'APPROVED')
      .eq('is_paid', false);
      
    if (!serverSubs || serverSubs.length === 0) return;
    
    const { data: serverRecs } = await supabaseServer.from('recipes').select('id, payout_rate');
    const sMap = new Map((serverRecs || []).map(r => [r.id, r.payout_rate]));
    
    const amountToPay = serverSubs.reduce((acc, sub) => acc + (sMap.get(sub.recipe_id) || 0), 0);
    
    if (amountToPay > 0) {
      // Create payout record
      const { error: payoutError } = await supabaseServer.from('payouts').insert({
        operator_id: operatorId,
        amount: amountToPay,
        status: 'PAID',
        paid_at: new Date().toISOString(),
        notes: `Payout for ${serverSubs.length} approved videos.`
      });
      
      if (!payoutError) {
        // Mark submissions as paid
        const subIds = serverSubs.map(s => s.id);
        await supabaseServer.from('submissions').update({ is_paid: true }).in('id', subIds);
      }
    }
    
    revalidatePath(`/admin/users/${operatorId}`);
  }

  const bankDetails = operator.bank_details;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            {operator.name || 'Unknown Operator'}
            {operator.status === 'ACTIVE' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" /> Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">
                <Ban className="w-3 h-3" /> Suspended
              </span>
            )}
          </h1>
          <p className="text-zinc-500 font-mono text-sm mt-1">{operator.email} • Joined {format(new Date(operator.created_at), 'MMM d, yyyy')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Stats & Bank Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-sm">
              <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" /> Lifetime
              </div>
              <div className="text-3xl font-black text-white">${lifetimeEarnings.toFixed(2)}</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-sm">
              <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" /> Paid
              </div>
              <div className="text-3xl font-black text-white">${paidEarnings.toFixed(2)}</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-sm">
              <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-500" /> Submissions
              </div>
              <div className="text-3xl font-black text-white">{safeSubmissions.length}</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-sm">
              <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> Pending QA
              </div>
              <div className="text-3xl font-black text-white">{pendingSubmissions.length}</div>
            </div>
          </div>

          {/* Submissions List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-500" /> Recent Submissions
              </h3>
            </div>
            <div className="p-5">
              {safeSubmissions.length === 0 ? (
                <div className="text-center text-zinc-500 py-8">No submissions yet.</div>
              ) : (
                <div className="space-y-4">
                  {safeSubmissions.slice(0, 5).map(sub => (
                    <div key={sub.id} className="flex justify-between items-center bg-zinc-950 p-4 rounded-xl border border-zinc-800/50">
                      <div>
                        <div className="text-sm font-bold text-zinc-200">{sub.recipe_title}</div>
                        <div className="text-xs text-zinc-500">{format(new Date(sub.submitted_at), 'MMM d, yyyy h:mm a')}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs font-mono text-zinc-400">
                          ${(recipeMap.get(sub.recipe_id) || 0).toFixed(2)}
                        </div>
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                          sub.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          sub.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Payouts & Bank Details */}
        <div className="space-y-6">
          {/* Payout Action Card */}
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>
            
            <div className="p-6 relative z-10">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" /> Outstanding Due
              </h3>
              
              <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                ${outstandingDue.toFixed(2)}
              </div>
              <p className="text-zinc-500 text-xs mb-6">
                From {outstandingSubmissions.length} approved, unpaid submissions.
              </p>

              <form action={processPayoutAction}>
                <button 
                  disabled={outstandingDue <= 0 || !bankDetails}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 text-sm font-black uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  <RefreshCw className="w-4 h-4" />
                  Process Payout
                </button>
              </form>
              {!bankDetails && outstandingDue > 0 && (
                <div className="mt-3 text-xs text-rose-400 flex items-start gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  Cannot process payout: Operator has not linked a bank account.
                </div>
              )}
            </div>
          </div>

          {/* Bank Details Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
             <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" /> Bank Details
              </h3>
            </div>
            
            {bankDetails ? (
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-zinc-500 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Account Name</div>
                    <div className="text-sm font-medium text-white">{bankDetails.accountName}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-zinc-500 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Bank Name & Branch</div>
                    <div className="text-sm font-medium text-white">{bankDetails.bankName} - {bankDetails.branch}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-zinc-500 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">District</div>
                    <div className="text-sm font-medium text-white">{bankDetails.district}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Hash className="w-4 h-4 text-zinc-500 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Routing & Account</div>
                    <div className="text-sm font-mono text-white">Acct: {bankDetails.accountNumber}</div>
                    <div className="text-sm font-mono text-zinc-400">Rout: {bankDetails.routingNumber}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-zinc-500 text-sm italic">
                No bank account linked.
              </div>
            )}
          </div>
          
          {/* Recent Payouts */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
             <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" /> Recent Payouts
              </h3>
            </div>
            <div className="p-5">
               {safePayouts.length === 0 ? (
                <div className="text-center text-zinc-500 py-4 text-sm">No payouts yet.</div>
              ) : (
                <div className="space-y-3">
                  {safePayouts.slice(0, 3).map(payout => (
                    <div key={payout.id} className="flex justify-between items-center bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                      <div>
                        <div className="text-sm font-bold text-zinc-200">${Number(payout.amount).toFixed(2)}</div>
                        <div className="text-xs text-zinc-500">{format(new Date(payout.created_at), 'MMM d, yyyy')}</div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {payout.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
