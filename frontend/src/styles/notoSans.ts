//notoSans.tsx
import { Noto_Sans_KR } from "next/font/google";

const bold = Noto_Sans_KR({
  weight: "700",
  display: "fallback",
  subsets: ["latin"],
  style: "normal",
  variable: "--noto-sans_KR-bold",
  fallback: ["system-ui"],
});

const regular = Noto_Sans_KR({
  weight: "400",
  display: "fallback",
  subsets: ["latin"],
  style: "normal",
  variable: "--noto-sans_KR-regular",
  fallback: ["system-ui"],
});

const extraLight = Noto_Sans_KR({
  weight: "300",
  display: "fallback",
  subsets: ["latin"],
  style: "normal",
  variable: "--noto-sans_KR-extraLight",
  fallback: ["system-ui"],
});

export {
  bold as notoSansKRBold,
  regular as notoSansKRRegular,
  extraLight as notoSansKRExtraLight,
};
