// api/auth.js

export default async function handler(req, res) {
  try {
    // 1. 动态导入 ESM 模块
    const { createAppAuth } = await import('@octokit/auth-app');
    
    // 2. 建立认证器
    const auth = createAppAuth({
      appId:         parseInt(process.env.APP_ID, 10),
      privateKey:    process.env.APP_PRIVATE_KEY,
      installationId: parseInt(process.env.INSTALLATION_ID, 10),
    });

    // 3. 签发 Installation Token
    const { token } = await auth({ type: 'installation' });

    // 4. 返回给 CMS
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({ token });
  } catch (err) {
    console.error('✖ auth error:', err);
    res.status(500).json({ error: err.message });
  }
}
