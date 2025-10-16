export async function requestGetVerification(getId: string) {
  const response = await fetch("/api/portone/getVerification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ getId }),
  });

  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}
