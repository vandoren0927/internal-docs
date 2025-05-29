// netlify/functions/upload-md.js
exports.handler = async (event, context) => {
  try {
    // 动态载入新版 @octokit/rest ES Module
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const { fileName, contentBase64, targetPath = '' } = JSON.parse(event.body);
    const OWNER   = 'vandoren0927';
    const REPO    = 'internal-docs';
    const BRANCH  = 'main';
    const filePath = ['docs', targetPath, fileName].filter(Boolean).join('/');

    // 尝试拿 sha（若文件已存在）
    let sha;
    try {
      const info = await octokit.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: filePath,
        ref: BRANCH
      });
      sha = info.data.sha;
    } catch (err) {
      if (err.status !== 404) throw err;
    }

    // 提交或更新
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: filePath,
      message: `Upload ${fileName} via uploader`,
      content: contentBase64,
      branch: BRANCH,
      sha
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, path: filePath })
    };
  } catch (err) {
    console.error('upload-md error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
