import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.ADMIN_JWT_SECRET || 'fallback-secret-for-dev-only-change-me';
const encodedKey = new TextEncoder().encode(secretKey);

export async function createAdminToken(payload: { id: string; username: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Token expires in 1 day
    .sign(encodedKey);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as { id: string; username: string };
  } catch (error) {
    return null;
  }
}
