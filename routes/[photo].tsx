import { Handlers, PageProps } from "$fresh/server.ts";
import { runQuery, urlFor } from "../SanityAPI.ts";
import { Photo } from "../types.d.ts";

export const handler: Handlers<Photo | null> = {
  async GET(_, ctx) {
    const query = `
    * [_type == 'photo' && _id == '${ctx.params.photo}'] {
      _id,
      "asset": image.asset,
      "metadata": image.asset->metadata,
      "caption": image.caption
    }`;
    const photo = await runQuery(query);
    return ctx.render(photo);
  },
};

export default function PhotoPage(props: PageProps<Photo | null>) {
  const { asset, caption } = props?.data[0];
  return (
    <figure>
      <img src={`${urlFor(asset._ref).width(640)}`} />
      <figcaption>
        {caption}
        <pre class="bg-gray-100 overflow-scroll p-4 text-xs">
          {JSON.stringify(props.data, null, 2)}
        </pre>
      </figcaption>
    </figure>
  );
}
