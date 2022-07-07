/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { runQuery, urlFor } from "../SanityAPI.ts";
import { tw } from "twind";

export const handler: Handlers<any | null> = {
  async GET(_, ctx) {
    const query = `
    * [_type == 'photo' && _id == '${ctx.params.photo}'] {
      _id,
      "asset": image.asset,
      "metadata": image.asset->metadata,
      "caption": image.caption
    }`;
    const resp = await runQuery(query);
    console.log(resp);
    return ctx.render(resp);
  },
};

export default function PhotoPage(props: PageProps) {
  const { asset, caption } = props?.data[0];
  return (
    <figure>
      <img src={`${urlFor(asset._ref).width(640)}`} />
      <figcaption>
        {caption}
        <pre class={tw`bg-gray-100 overflow-scroll p-4 text-xs`}>
          {JSON.stringify(props.data, null, 2)}
        </pre>
      </figcaption>
    </figure>
  );
}
