/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { runQuery, urlFor } from "../SanityAPI.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<any[] | null> = {
  async GET(_, ctx) {
    const query = ` * [_type == 'photo'] { _id, title, image }`;
    const resp = await runQuery(query);
    return ctx.render(resp);
  },
};

export default function Home({ data }: PageProps<any[] | null>) {
  if (!data) {
    return <h1>No photos not found</h1>;
  }

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <small>
        {JSON.stringify(data)}
      </small>

      {data.map((photo: any) => (
        <div key={photo._id}>
          <figure>
            <img
              src={`${urlFor(photo.image.asset._ref).width(1024)}`}
              alt={photo.title}
            />
            <figcaption>
              {photo.title}
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
