// api/auth.js
import { createAppAuth } from "@octokit/auth-app";

export default async function handler(req, res) {
  try {
    // 建立 GitHub App 驗證器
    const auth = createAppAuth({
      appId:         parseInt(process.env.APP_ID, 10),
      privateKey:    process.env.APP_PRIVATE_KEY,
      installationId: parseInt(process.env.INSTALLATION_ID, 10),
    });
    // 簽發 Installation Token
    const { token } = await auth({ type: "installation" });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ token });
  } catch (err) {
    console.error("auth handler error:", err);
    res.status(500).send({ error: err.message });
  }
}
