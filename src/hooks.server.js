import { json } from '@sveltejs/kit';
//import jwt from '@tsndr/cloudflare-worker-jwt';

// List specific allowed headers for added security
const ALLOWED_HEADERS = 'Content-Type, Authorization';

// List specific allowed methods for added security
const ALLOWED_METHODS = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';

export const handle = async ({ event, resolve }) => {
  // Handle CORS preflight request
  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust this to specific origins if needed
        'Access-Control-Allow-Methods': ALLOWED_METHODS,
        'Access-Control-Allow-Headers': ALLOWED_HEADERS,
      },
    });
  }

  const response = await resolve(event);

  // Ensure all responses from your API endpoints have CORS headers
//   if (event.url.pathname.startsWith('/api')) {
//     //response.headers.append('Access-Control-Allow-Origin', '*'); // Adjust if necessary
//     response.headers.append('Access-Control-Allow-Methods', ALLOWED_METHODS);
//     response.headers.append('Access-Control-Allow-Headers', ALLOWED_HEADERS);
//   }

  return response;
};
