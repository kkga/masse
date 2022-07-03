import { MdPhoto as icon } from "react-icons/md";

export default {
  name: "photo",
  title: "Photo",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100,
      },
    },
    {
      name: "overview",
      title: "Overview",
      type: "blockContent",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "castMembers",
      title: "Cast Members",
      type: "array",
      of: [{ type: "castMember" }],
    },
    {
      name: "crewMembers",
      title: "Crew Members",
      type: "array",
      of: [{ type: "crewMember" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "releaseDate",
      media: "poster",
      castName0: "castMembers.0.person.name",
      castName1: "castMembers.1.person.name",
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
