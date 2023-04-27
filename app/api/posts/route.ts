export const runtime = 'edge';

type Post = {
  id: string;
  title: string;
  body: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');

  if (id) {
    let post = posts.filter((p) => p.id === id)[0];

    // if no post exists for id, create one on the fly to demonstrate ssg / ssr / isr
    if (!post) {
      post = {
        id,
        title: `Post ${id}`,
        body: ``,
      };
    }

    // concat date onto the body so we can see when content was cached
    post.body = `This post was retrieved on ${new Date().toString()}`;

    if (post) {
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });
    }
  }

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

const posts: Post[] = [
  {
    id: '1',
    title: 'Post 1',
    body: '',
  },
  {
    id: '2',
    title: 'Post 2',
    body: '',
  },
];
