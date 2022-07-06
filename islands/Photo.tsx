/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { urlFor } from "../SanityAPI.ts";

interface PhotoProps {
  photo: {
    _id: string;
    asset: {
      _ref: string;
      _type: string;
    };
    caption: string;
  };
  onClick: (id: string) => void;
}

export default function Photo({ photo, onClick }: PhotoProps) {
  const caption = tw`text-xs mt-2 text-center`;

  return (
    <figure
      key={photo._id}
      onClick={() => onClick(photo._id)}
    >
      <img
        src={`${urlFor(photo.asset._ref).width(1024)}`}
      />
      <figcaption class={caption}>
        {photo.caption}
        {
          // <pre class={tw`bg-gray-100 overflow-scroll p-4 text-xs`}>
          //   {JSON.stringify(photo, null, 2)}
          // </pre>
        }
      </figcaption>
    </figure>
  );
}
