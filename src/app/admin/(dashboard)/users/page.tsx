import { createAdminClient } from '@/lib/supabase/admin';
import { Users as UsersIcon, Search, MoreVertical, Ban, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { BankDetailsPopover } from '@/components/admin/BankDetailsPopover';

export const dynamic = 'force-dynamic';

// Server component
export default async function OperatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const supabase = createAdminClient();
  const params = await searchParams;
  const search = params?.search || '';

  // Fetch operators with search filtering if query exists
  let query = supabase
    .from('operators')
    .select('*')
    .order('created_at', { ascending: false });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data: operators, error } = await query;

  if (error) {
    console.error('Error fetching operators:', error);
  }

  const validOperators = operators || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <UsersIcon className="w-6 h-6" />
            </div>
            Operators Database
          </h1>
          <p className="text-zinc-500 mt-2">Manage your creator network and their platform access.</p>
        </div>
        
        <form method="GET" className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            name="search"
            defaultValue={search}
            placeholder="Search operators..." 
            className="bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-red-500/50 w-full sm:w-64"
          />
        </form>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50 text-zinc-500 font-medium uppercase tracking-wider text-xs">
                <th className="px-6 py-4">Operator</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4">Bank Details</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {validOperators.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No operators found. Ensure the SQL script was run and users have signed up.
                  </td>
                </tr>
              ) : (
                validOperators.map((operator) => (
                  <tr key={operator.id} className="hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-400">
                          {operator.name ? operator.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <div className="font-bold text-zinc-200">{operator.name || 'Unknown'}</div>
                          <div className="text-xs text-zinc-500 font-mono">{operator.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {operator.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">
                          <Ban className="w-3 h-3" /> Suspended
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {operator.created_at ? format(new Date(operator.created_at), 'MMM d, yyyy') : 'Unknown'}
                    </td>
                    <td className="px-6 py-4">
                      {operator.bank_details ? (
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-zinc-400 space-y-1">
                            <div className="text-zinc-200 font-semibold">{operator.bank_details.bankName}</div>
                            <div className="font-mono">Acct: ••••{operator.bank_details.accountNumber?.slice(-4) || '????'}</div>
                          </div>
                          <BankDetailsPopover bankDetails={operator.bank_details} />
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-600 italic">Not linked</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/users/${operator.id}`}
                        className="inline-flex p-2 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                        title="View Operator Details"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
