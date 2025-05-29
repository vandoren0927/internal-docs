// netlify/functions/upload-md.js
exports.handler = async (event) => {
  try {
    // 動態載入新版 Octokit ESM 模組
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const { fileName, contentBase64, targetPath = '' } = JSON.parse(event.body);
    const OWNER  = 'vandoren0927';
    const REPO   = 'internal-docs';
    const BRANCH = 'main';

    // 根據副檔名決定存放位置
    const ext = fileName.split('.').pop().toLowerCase();
    const baseFolder = ext === 'md' ? 'docs' : 'static/img';
    const filePath = [baseFolder, targetPath, fileName]
      .filter(Boolean).join('/');

    // 嘗試讀取現有 sha（若檔案已存在）
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

    // 建立或更新檔案
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
