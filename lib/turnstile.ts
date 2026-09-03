// Cloudflare Turnstile server-side verification. No-ops (returns true) when
// TURNSTILE_SECRET_KEY isn't set, so the form still works without it — but
// then the honeypot + time-trap + rate limit are the only bot defenses.
// Get a free site key + secret key at https://dash.cloudflare.com/?to=/:account/turnstile

export async function verifyTurnstileToken(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: remoteIp }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    return false;
  }
}
