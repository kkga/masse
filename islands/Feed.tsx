import { useEffect, useRef, useState } from "preact/hooks";
import { urlFor } from "../sanity.ts";
import { IPhoto } from "../types.d.ts";
import Photo from "./Photo.tsx";

interface FeedProps {
  photos: IPhoto[];
}

export default function Feed({ photos, ...rest }: FeedProps) {
  const [current, setCurrent] = useState<IPhoto | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (current) {
      history.pushState(null, "", `/p/${current._id}`);
      container.current?.children[
        photos.findIndex((p) => p._id === current._id)
      ].scrollIntoView({ block: "center", inline: "center" });
    } else {
      history.pushState(null, "", "/");
    }
  }, [current]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCurrent(null);
      const curI = photos.findIndex((p) => p._id === current?._id);

      if (e.key === "ArrowLeft") {
        if (curI === -1) {
          setCurrent(null);
          return;
        }
        setCurrent(photos[curI - 1]);
      }
      if (e.key === "ArrowRight") {
        if (curI === photos.length - 1) {
          setCurrent(null);
          return;
        }
        setCurrent(photos[curI + 1]);
      }
    };

    const handlePopState = () => setCurrent(null);

    if (current !== null) {
      addEventListener("popstate", handlePopState);
      addEventListener("keydown", handleKey);
    } else {
      removeEventListener("popstate", handlePopState);
      removeEventListener("keydown", handleKey);
    }

    return () => {
      removeEventListener("popstate", handlePopState);
      removeEventListener("keydown", handleKey);
    };
  }, [current]);

  return (
    <div>
      {current && (
        <dialog
          class="fixed flex w-[100vw] h-[100vh] z-50 inset-0 h-[100vh] p-8 bg-white"
          open
        >
          <figure
            class="flex-1 flex gap-8 text-gray-500 text-sm"
            onClick={() => setCurrent(null)}
          >
            <img
              class="w-full object-contain"
              src={`${urlFor(current.asset._ref).width(2048)}`}
              alt={current.caption}
              title={current.caption}
            />
            <figcaption class="text-xs w-1/6">{current.caption}</figcaption>
          </figure>
        </dialog>
      )}

      <div
        ref={container}
        class="grid md:grid-cols-2 gap-8 xl:grid-cols-3 2xl:grid-cols-4 place-items-stretch "
      >
        {photos.map((photo, i) => (
          <Photo onClick={() => setCurrent(photo)} photo={photo} />
        ))}
      </div>
    </div>
  );
}
