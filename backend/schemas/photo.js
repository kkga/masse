import { ImageIcon } from "@sanity/icons";

export default {
  name: "photo",
  title: "Photo",
  type: "document",
  icon: ImageIcon,
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        metadata: [
          "exif", // Default: not included
          "location", // Default: not included
        ],
      },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
          options: {
            isHighlighted: true, // <-- make this field easily accessible
          },
        },
      ],
    },
    {
      name: "albums",
      title: "Albums",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "album" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "image.caption",
      date: "date",
      media: "image",
      album: "albums.0.album.name",
    },
    prepare(selection) {
      const year = selection.date && selection.date.split("-")[0];
      const cast = [selection.castName0, selection.castName1].filter(Boolean)
        .join(", ");

      return {
        title: `${selection.title} ${year ? `(${year})` : ""}`,
        date: selection.date,
        subtitle: cast,
        media: selection.media,
      };
    },
  },
};
