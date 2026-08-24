import { cookies } from 'next/headers';
import { verifyAdminToken } from './jwt';

/**
 * Verify the admin JWT token from cookies.
 * Returns the admin payload if valid, null otherwise.
 * Use in API routes to gate admin-only operations.
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return null;

  return await verifyAdminToken(token);
}
