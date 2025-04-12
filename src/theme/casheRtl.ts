// import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "joyrtl",
  stylisPlugins: [rtlPlugin],
});

export default cacheRtl;
