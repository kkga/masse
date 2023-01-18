import { useState } from "preact/hooks";
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
  };

  return (
    <div>
      {lightbox && (
        <div
          class="fixed inset-0 flex p-0 sm:p-8 place-content-center bg-black"
          onClick={() => setLightbox(null)}
        >
          <img
            class="object-contain"
            src={`${urlFor(lightbox.asset._ref).width(2048)}`}
            alt={lightbox.title}
          />
        </div>
      )}

      <div class="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 sm:gap-12 place-items-center">
        {photos.map((photo) => <Photo onClick={handleClick} photo={photo} />)}
      </div>
    </div>
  );
}
