import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
    colors: {
      black: colors.black,
      gray: colors.gray,
      transparent: "transparent",
    },
  },
} as Options;
