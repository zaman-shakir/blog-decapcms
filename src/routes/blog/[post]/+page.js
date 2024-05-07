import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
	console.log("consoling here: this is sinle blog posts");
	console.log(params);
	try {
		const post = await import(`../../../lib/posts/${params.post}.md`)
        console.log(post);
		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.post }
		}
	} catch(err) {
		error(404, err);
	}
}
