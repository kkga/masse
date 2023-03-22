import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { runQuery, urlFor } from "../../sanity.ts";
import { IPhoto } from "../../types.d.ts";

export const handler: Handlers<IPhoto | null> = {
  async GET(_, ctx) {
    const query = `
    * [_type == 'photo' && _id == '${ctx.params.photo}'] {
      _id,
      "asset": image.asset,
      "metadata": image.asset->metadata,
      "caption": image.caption
    }[0]`;
    const photo = await runQuery(query);
    return ctx.render(photo);
  },
};

export default function PhotoPage(props: PageProps<IPhoto | null>) {
  const photo = props?.data;
  console.log(photo);
  return (
    <html>
      <Head>
        <title>{photo?.caption} - kkga-photos</title>
      </Head>
      <body class="bg-black">
        <figure class="flex min-h-screen gap-8 p-8 bg-black text-gray-500 text-sm">
          {photo && (
            <>
              <img
                class="w-full object-contain"
                src={`${urlFor(photo.asset._ref).width(2048)}`}
              />
              <figcaption class="w-1/6">{photo.caption}</figcaption>
            </>
          )}
        </figure>
      </body>
    </html>
  );
}
