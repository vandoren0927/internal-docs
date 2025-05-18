// api/auth.js

// 以 CommonJS 导出 handler，Vercel 会通过 require() 加载本文件
module.exports = async function handler(req, res) {
  try {
    // 动态 import ESM 模块，避免 require() 直接报 ESM 错误
    const { createAppAuth } = await import('@octokit/auth-app');

    // 读取并处理环境变量
    const appId = parseInt(process.env.APP_ID, 10);
    const installationId = parseInt(process.env.INSTALLATION_ID, 10);
    let privateKey = process.env.APP_PRIVATE_KEY || '';

    // 如果私钥里用了 \n 表示换行，就替换成真实换行
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    // 创建 App Auth 实例并签发 Installation Token
    const auth = createAppAuth({ appId, installationId, privateKey });
    const { token } = await auth({ type: 'installation' });

    // 返回 JSON 给前端 CMS
    res.status(200).json({ token });
  } catch (err) {
    console.error('Auth function error:', err);
    res.status(500).json({ error: err.message });
  }
};
