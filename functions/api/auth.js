// functions/api/auth.js
import { createAppAuth } from "@octokit/auth-app";

export async function onRequest(context) {
  const { env } = context;
  try {
    const auth = createAppAuth({
      appId:         parseInt(env.APP_ID, 10),
      privateKey:    env.APP_PRIVATE_KEY,
      installationId: parseInt(env.INSTALLATION_ID, 10),
    });
    const { token } = await auth({ type: "installation" });
    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("auth error", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
