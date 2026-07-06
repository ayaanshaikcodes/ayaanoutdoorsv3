// ============================================================
//  GitHub OAuth — step 1: redirect the user to GitHub to log in.
//  Runs as a Vercel serverless function at /api/auth.
//  Needs env var:  OAUTH_GITHUB_CLIENT_ID
// ============================================================
export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
  if (!clientId) {
    res.status(500).send('Missing OAUTH_GITHUB_CLIENT_ID environment variable')
    return
  }

  const host = req.headers.host
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const redirectUri = `${proto}://${host}/api/callback`

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo', // needed so the CMS can commit to a private repo
    // a random state value to protect against CSRF
    state: Math.random().toString(36).slice(2),
  })

  res.writeHead(302, {
    Location: `https://github.com/login/oauth/authorize?${params}`,
  })
  res.end()
}
