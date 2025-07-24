//index.tsx
import { css } from "@emotion/react";

import {
  notoSansKRBold,
  notoSansKRRegular,
  notoSansKRExtraLight,
} from "./notoSans";

const bold = css`
  font-family: ${notoSansKRBold.style.fontFamily};
`;

const regular = css`
  font-family: ${notoSansKRRegular.style.fontFamily};
`;

const extraLight = css`
  font-family: ${notoSansKRExtraLight.style.fontFamily};
`;

export { bold, regular, extraLight };
