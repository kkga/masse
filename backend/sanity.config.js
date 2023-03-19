import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import schemas from './schemas/schema'

export default defineConfig({
  title: "photos",
  projectId: "lbd3qpx8",
  dataset: "production",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemas,
  },
});
