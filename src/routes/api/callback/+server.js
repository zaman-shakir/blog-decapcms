import { text } from '@sveltejs/kit';

// Function to render the response body
function renderBody(status, content) {
  const html = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
  return html; // returning the script as HTML content
}

// Define the POST function
export async function POST({ request, params, url }) {
  // Get environment variables from SvelteKit
  const client_id = 'Ov23lixAa7I0xBJ7v86Q'; // using VITE_ prefix for public env vars
  const client_secret = 'b970ec34dee9630d164ae5346e700c833eb9a569';

  try {
    // Extract the code from the URL query parameters
    const code = url.searchParams.get('code');

    // Fetch the access token from GitHub
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'sveltekit-github-oauth',
          'accept': 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code }),
      }
    );

    const result = await response.json();

    if (result.error) {
      return text(renderBody('error', result), {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
        status: 401,
      });
    }

    // Successfully got the token
    const token = result.access_token;
    const provider = 'github';
    const responseBody = renderBody('success', {
      token,
      provider,
    });

    return text(responseBody, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 200,
    });

  } catch (error) {
    console.error('Error in OAuth flow:', error);
    return text('Server Error', {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 500,
    });
  }
}

// function renderBody(status, content) {
//     const html = `
//     <script>
//       const receiveMessage = (message) => {
//         window.opener.postMessage(
//           'authorization:github:${status}:${JSON.stringify(content)}',
//           message.origin
//         );
//         window.removeEventListener("message", receiveMessage, false);
//       }
//       window.addEventListener("message", receiveMessage, false);
//       window.opener.postMessage("authorizing:github", "*");
//     </script>
//     `;
//     const blob = new Blob([html]);
//     return blob;
// }

// export async function onRequest(context) {
//     const {
//         request, // same as existing Worker API
//         env, // same as existing Worker API
//         params, // if filename includes [id] or [[path]]
//         waitUntil, // same as ctx.waitUntil in existing Worker API
//         next, // used for middleware or to fetch assets
//         data, // arbitrary space for passing data between middlewares
//     } = context;

//     const client_id = env.GITHUB_CLIENT_ID;
//     const client_secret = env.GITHUB_CLIENT_SECRET;

//     try {
//         const url = new URL(request.url);
//         const code = url.searchParams.get('code');
//         const response = await fetch(
//             'https://github.com/login/oauth/access_token',
//             {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json',
//                     'user-agent': 'cloudflare-functions-github-oauth-login-demo',
//                     'accept': 'application/json',
//                 },
//                 body: JSON.stringify({ client_id, client_secret, code }),
//             },
//         );
//         const result = await response.json();
//         if (result.error) {
//             return new Response(renderBody('error', result), {
//                 headers: {
//                     'content-type': 'text/html;charset=UTF-8',
//                 },
//                 status: 401
//             });
//         }
//         const token = result.access_token;
//         const provider = 'github';
//         const responseBody = renderBody('success', {
//             token,
//             provider,
//         });
//         return new Response(responseBody, {
//             headers: {
//                 'content-type': 'text/html;charset=UTF-8',
//             },
//             status: 200
//         });

//     } catch (error) {
//         console.error(error);
//         return new Response(error.message, {
//             headers: {
//                 'content-type': 'text/html;charset=UTF-8',
//             },
//             status: 500,
//         });
//     }
// }
/*
// src/routes/api/callback/+server.js
import { error } from '@sveltejs/kit';

function renderBody(status, content) {
  const html = `
  <script>
    const receiveMessage = (message) => {
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify(content)}',
        message.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    };
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  </script>
  `;
  return html;
}

export async function GET({ url, locals }) {
  // Retrieve OAuth client ID and secret from environment variables
  //const client_id = env.GITHUB_CLIENT_ID;
  const client_id = "Ov23lixAa7I0xBJ7v86Q";
  //const client_secret = env.GITHUB_CLIENT_SECRET;
  const client_secret = "b970ec34dee9630d164ae5346e700c833eb9a569";

  if (!client_id || !client_secret) {
    alert(
        "Invalid OAuth client"
    );
    throw error(504, 'Environment variables for GitHub OAuth are not set');
  }
  console.log("before try");

  try {

    const code = url.searchParams.get('code'); // Get the OAuth authorization code
    if (!code) {
      throw error(400, 'No authorization code found');
    }
    console.log("inside try");
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code }),
      }
    );

    const result = await response.json();
    console.log(result);
    if (result.error) {
      return {
        status: 401,
        body: renderBody('error', result),
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      };
    }

    const token = result.access_token; // Extract the access token from the response
    const responseBody = renderBody('success', { token, provider: 'github' });

    return {
      status: 200,
      body: responseBody,
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    };

  } catch (err) {
    console.error('Error handling OAuth callback:', err);
    throw error(505, 'Internal Server Error');
  }
}
