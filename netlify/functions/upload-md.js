// netlify/functions/upload-md.js
exports.handler = async (event) => {
  try {
    // 确保这里只用动态 import，不用 require
    const { Octokit } = await import('@octokit/rest');

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const { fileName, contentBase64, targetPath = '' } = JSON.parse(event.body);

    const OWNER  = 'vandoren0927';
    const REPO   = 'internal-docs';
    const BRANCH = 'main';

    // 根据后缀分流：md 到 docs，其他到 static/img
    const ext = fileName.split('.').pop().toLowerCase();
    const baseFolder = ext === 'md' ? 'docs' : 'static/img';
    const filePath = [baseFolder, targetPath, fileName].filter(Boolean).join('/');

    // 尝试拿 SHA（若存在）
    let sha;
    try {
      const info = await octokit.repos.getContent({
        owner: OWNER, repo: REPO, path: filePath, ref: BRANCH
      });
      sha = info.data.sha;
    } catch (err) {
      if (err.status !== 404) throw err;
    }

    // 新建或更新文件
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
    // 捕获所有异常并返回 JSON
    console.error('upload-md error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
