import { ImagesIcon } from "@sanity/icons";

export default {
  name: "album",
  title: "Album",
  type: "document",
  icon: ImagesIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Album name",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "Cover image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
};
