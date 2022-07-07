/** @jsx h */
import "preact/debug";
import { h } from "preact";
import { tw } from "@twind";
import Feed from "../islands/Feed.tsx";
import { runQuery } from "../SanityAPI.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<any | null> = {
  async GET(_, ctx) {
    const query = `
    * [_type == 'photo'] {
      _id,
      "asset": image.asset,
      "metadata": image.asset->metadata,
      "caption": image.caption
    }`;
    const resp = await runQuery(query);
    return ctx.render(resp);
  },
};

export default function Home({ data }: PageProps<any | null>) {
  if (!data) {
    return <h1>No photos not found</h1>;
  }

  return (
    <div class={tw`m-8 mx-auto`}>
      <Feed photos={data} />
    </div>
  );
}
