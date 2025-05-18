// api/auth.js
import { createAppAuth } from "@octokit/auth-app";

export default async function handler(req, res) {
  try {
    const appId          = parseInt(process.env.APP_ID, 10);
    const installationId = parseInt(process.env.INSTALLATION_ID, 10);
    const privateKey     = process.env.APP_PRIVATE_KEY;

    const auth = createAppAuth({
      appId,
      privateKey,
      installationId
    });

    // 取得 installation token
    const { token } = await auth({ type: "installation" });

    // 返回给前端 CMS
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
