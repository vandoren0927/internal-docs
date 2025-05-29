// netlify/functions/upload-md.js
exports.handler = async (event) => {
  try {
    // 用动态 import 加载 ESM 版 Octokit
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    // 从前端 body 拿到 fileType
    const { fileType, fileName, contentBase64, targetPath = '' } =
      JSON.parse(event.body);

    const OWNER  = 'vandoren0927';
    const REPO   = 'internal-docs';
    const BRANCH = 'main';

    // 根据 fileType 决定存放文件夹
    const baseFolder = fileType === 'md' ? 'docs' : 'static/img';
    const filePath = [baseFolder, targetPath, fileName]
      .filter(Boolean)
      .join('/');

    // 检查是否已有文件以获取 sha
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

    // 创建或更新文件
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
