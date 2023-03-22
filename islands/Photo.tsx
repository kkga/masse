import { urlFor } from "../sanity.ts";
import { IPhoto } from "../types.d.ts";

interface PhotoProps {
  photo: IPhoto;
  onClick: () => void;
}

export default function Photo({ photo, onClick }: PhotoProps) {
  return (
    <figure
      class="flex flex-col gap-4 items-center justify-center"
      key={photo._id}
    >
      <img
        onClick={onClick}
        class="select-none cursor-pointer"
        src={`${urlFor(photo.asset._ref).width(1024)}`}
      />
      <figcaption class="text-xs text-center">{photo.caption}</figcaption>
    </figure>
  );
}
