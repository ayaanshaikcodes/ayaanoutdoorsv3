// ============================================================
//  GitHub OAuth — step 2: GitHub redirects back here with a code.
//  We exchange it for an access token, then hand the token back
//  to the CMS window via postMessage (the format Decap/Sveltia
//  expect). Runs at /api/callback.
//  Needs env vars:
//    OAUTH_GITHUB_CLIENT_ID
//    OAUTH_GITHUB_CLIENT_SECRET
// ============================================================
export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET
  const code = req.query.code

  if (!clientId || !clientSecret) {
    res.status(500).send('Missing GitHub OAuth environment variables')
    return
  }
  if (!code) {
    res.status(400).send('Missing ?code from GitHub')
    return
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })
    const data = await tokenRes.json()

    if (data.error || !data.access_token) {
      sendResult(res, 'error', data.error_description || data.error || 'No token returned')
      return
    }
    sendResult(res, 'success', { token: data.access_token, provider: 'github' })
  } catch (err) {
    sendResult(res, 'error', String(err))
  }
}

// Returns a tiny HTML page that messages the token to the CMS popup opener.
function sendResult(res, status, payload) {
  const msg =
    status === 'success'
      ? `authorization:github:success:${JSON.stringify(payload)}`
      : `authorization:github:error:${JSON.stringify({ message: payload })}`

  const html = `<!DOCTYPE html><html><body><script>
    (function () {
      function send() {
        window.opener && window.opener.postMessage(${JSON.stringify(msg)}, '*');
      }
      window.addEventListener('message', send, false);
      send();
      setTimeout(function(){ window.close(); }, 800);
    })();
  </script><p>Logging you in… you can close this window.</p></body></html>`

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
