import { SignJWT, jwtVerify } from 'jose';

function getSecretKey(): Uint8Array {
  const secretKey = process.env.ADMIN_JWT_SECRET;
  if (!secretKey) {
    throw new Error(
      'ADMIN_JWT_SECRET environment variable is required. ' +
      'Set it in .env.local or your hosting provider\'s environment variables.'
    );
  }
  return new TextEncoder().encode(secretKey);
}

export async function createAdminToken(payload: { id: string; username: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h') // 2 hours (reduced from 1 day)
    .sign(getSecretKey());
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ['HS256'],
    });
    return payload as { id: string; username: string };
  } catch {
    return null;
  }
}
