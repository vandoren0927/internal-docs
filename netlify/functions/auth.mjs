// netlify/functions/api/auth.js
import { createAppAuth } from "@octokit/auth-app";

export async function handler(event) {
  try {
    const auth = createAppAuth({
      appId:        Number(process.env.APP_ID),
      privateKey:   process.env.APP_PRIVATE_KEY.replace(/\\n/g, "\n"),
      installationId: Number(process.env.INSTALLATION_ID),
    });

    const { token } = await auth({ type: "installation" });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
