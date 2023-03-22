import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Feed from "../islands/Feed.tsx";
import { runQuery } from "../sanity.ts";
import { IPhoto } from "../types.d.ts";

export const handler: Handlers<IPhoto[] | null> = {
  async GET(_, ctx) {
    const query = `
    * [_type == 'photo'] | order(_createdAt desc) {
      _id,
      "asset": image.asset,
      "metadata": image.asset->metadata,
      "caption": image.caption
    }`;
    const resp = await runQuery(query);
    return ctx.render(resp);
  },
};

export default function Home({ data }: PageProps<IPhoto[] | null>) {
  return (
    <html>
      <Head>
        <title>kkga-photos</title>
      </Head>
      <body class="bg-white text-gray-600 p-8 text-sm">
        <div class="mb-8">work in progress...</div>
        {data && <Feed photos={data} />}
      </body>
    </html>
  );
}
