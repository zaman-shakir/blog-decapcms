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

//     try {
//         const url = new URL(request.url);
//         const redirectUrl = new URL('https://github.com/login/oauth/authorize');
//         redirectUrl.searchParams.set('client_id', client_id);
//         redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
//         redirectUrl.searchParams.set('scope', 'repo user');
//         redirectUrl.searchParams.set(
//             'state',
//             crypto.getRandomValues(new Uint8Array(12)).join(''),
//         );
//         return Response.redirect(redirectUrl.href, 301);

//     } catch (error) {
//         console.error(error);
//         return new Response(error.message, {
//             status: 500,
//         });
//     }
// }
// src/routes/api/auth/+server.js
import { error, redirect } from '@sveltejs/kit';

export async function GET({ url, locals }) {
  // `env` should come from your SvelteKit configuration, usually through an environment variable manager.
  const client_id = env.GITHUB_CLIENT_ID; // Ensure env vars are accessible
  if (!client_id) {
    throw error(500, 'GITHUB_CLIENT_ID is not set');
  }

  try {
    const redirectUrl = new URL('https://github.com/login/oauth/authorize');
    redirectUrl.searchParams.set('client_id', client_id);
    redirectUrl.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
    redirectUrl.searchParams.set('scope', 'repo user');
    redirectUrl.searchParams.set(
      'state',
      crypto.getRandomValues(new Uint8Array(12)).join('')
    );

    // Redirect the request to GitHub's OAuth authorization page
    throw redirect(301, redirectUrl.href);

  } catch (e) {
    console.error('Error handling OAuth redirect:', e);
    throw error(500, e.message);
  }
}
