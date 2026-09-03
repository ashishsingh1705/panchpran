// Fire-and-forget notification to a Slack/Discord-compatible incoming
// webhook when something on the backend genuinely fails (not on routine
// validation errors or spam rejections). No-ops if OPS_ALERT_WEBHOOK_URL
// isn't set. Never throws — a failed alert must not fail the request that
// triggered it.

export function notifyOpsOfFailure(message: string) {
  const url = process.env.OPS_ALERT_WEBHOOK_URL;
  if (!url) return;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // `text` matches Slack's incoming-webhook format, `content` matches
    // Discord's — sending both is harmless and covers either provider.
    body: JSON.stringify({ text: message, content: message }),
  }).catch((err) => {
    console.error("Ops alert webhook failed:", err);
  });
}
