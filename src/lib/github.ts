// lib/github.ts
import jwt from 'jsonwebtoken';
import axios from 'axios';

const APP_ID = process.env.GITHUB_APP_ID!;
const APP_OWNER = process.env.GITHUB_APP_OWNER!;
const APP_REPO = process.env.GITHUB_APP_REPO!;
const PRIVATE_KEY = Buffer.from(process.env.GITHUB_PRIVATE_KEY_BASE64!, 'base64').toString('utf8');
const INSTALLATION_ID = process.env.GITHUB_INSTALLATION_ID!;


let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

/**
 * 生成 GitHub App JWT（有效期 10 分钟）
 */
function generateAppJWT(): string {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (10 * 60), // 10 分钟
    iss: APP_ID,
  };
  return jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
}

/**
 * 获取有效的 Installation Access Token（有效期 1 小时）
 */
export async function getInstallationToken(): Promise<string> {
  const now = Date.now();

  // 如果缓存存在且未过期（提前 5 分钟刷新）
  if (cachedToken && tokenExpiry && now < tokenExpiry - 5 * 60 * 1000) {
    return cachedToken;
  }

  const appJwt = generateAppJWT();
  const response = await axios.post(
    `https://api.github.com/app/installations/${INSTALLATION_ID}/access_tokens`,
    {},
    {
      headers: {
        Authorization: `Bearer ${appJwt}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  const { token, expires_at } = response.data;
  cachedToken = token;
  tokenExpiry = new Date(expires_at).getTime();

  return token;
}

/**
 * 获取私有仓库中的文件内容（如 .md）
 */
export async function fetchFileFromRepo(path: string): Promise<string> {
  const token = await getInstallationToken();
  const response = await axios.get(
    `https://api.github.com/repos/${APP_OWNER}/${APP_REPO}/contents/${path}`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  const contentBase64 = response.data.content;
  return Buffer.from(contentBase64, 'base64').toString('utf8');
}