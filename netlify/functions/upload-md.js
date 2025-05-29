// netlify/functions/upload-md.js
const { Octokit } = require('@octokit/rest');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const { fileName, contentBase64, targetPath = '' } = JSON.parse(event.body);

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const OWNER = 'vandoren0927';
  const REPO  = 'internal-docs';
  const BRANCH = 'main';
  const path = ['docs', targetPath, fileName].filter(Boolean).join('/');

  // 先查 sha（若已存在）
  let sha;
  try {
    const resp = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path, ref: BRANCH });
    sha = resp.data.sha;
  } catch (e) {
    if (e.status !== 404) throw e;
  }

  // 上傳或更新
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message: `Upload ${fileName} via uploader`,
    content: contentBase64,
    branch: BRANCH,
    sha
  });

  return { statusCode: 200, body: JSON.stringify({ ok: true, path }) };
};
