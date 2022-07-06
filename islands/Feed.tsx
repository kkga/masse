/** @jsx h */
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { urlFor } from "../SanityAPI.ts";
import Photo from "./Photo.tsx";

interface FeedProps {
  photos: any[];
}

export default function Feed({ photos }: FeedProps) {
  const [lightbox, setLightbox] = useState<null | any>(null);

  const handleClick = (photoId: string) => {
    const photo = photos.find((p) => p._id === photoId);
    if (photo) setLightbox(photo);
    console.log(photoId);
  };

  const grid = tw`grid grid-cols-3 gap-16 place-items-center`;

  return (
    <div class={tw`m-8`}>
      {lightbox && (
        <div
          class={tw`fixed inset-0 flex place-content-center p-8 bg-black`}
          onClick={() => setLightbox(null)}
        >
          <img
            src={`${urlFor(lightbox.asset._ref).width(1024)}`}
            alt={lightbox.title}
          />
        </div>
      )}

      <div class={grid}>
        {photos.map((photo) => <Photo onClick={handleClick} photo={photo} />)}
      </div>
    </div>
  );
}
