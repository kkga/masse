import { Handlers, PageProps } from "$fresh/server.ts";
import { runQuery } from "../SanityAPI.ts";
import Feed from "../islands/Feed.tsx";
import { Photo } from "../types.d.ts";

export const handler: Handlers<Photo[] | null> = {
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

export default function Home({ data }: PageProps<Photo[] | null>) {
  if (!data) {
    return <h1>No photos not found</h1>;
  }

  return (
    <div class="flex flex-col gap-8 sm:gap-12 p-8 sm:p-12 bg-black text-gray-500">
      <div class="text-sm">work in progress...</div>
      <Feed photos={data} />
    </div>
  );
}
