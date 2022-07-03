/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { runQuery } from "../SanityAPI.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Photo {
  _id: string;
  title: string;
}

export const handler: Handlers<Photo[] | null> = {
  async GET(_, ctx) {
    const query = ` * [_type == 'photo'] { _id, title }`;

    const resp = await runQuery(query);
    console.log(resp);

    return ctx.render(resp);
  },
};

export default function Home({ data }: PageProps<Photo[] | null>) {
  if (!data) {
    return <h1>User not found</h1>;
  }

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      {JSON.stringify(data)}

      {data.map((photo: Photo) => (
        <div key={photo._id}>
          {photo.title}
        </div>
      ))}
    </div>
  );
}
