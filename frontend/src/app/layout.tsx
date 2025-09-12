import { ModalManager } from "@/components/ui/modal/alert";
import ReduxProvider from "@/redux/reduxProvider";
import DefaultLayout from "@/components/layout/defaultLayout";
import "./globals.scss";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js" />
      </head>
      <body>
        <ReduxProvider>
          <DefaultLayout>{children}</DefaultLayout>
          <ModalManager />
        </ReduxProvider>
      </body>
    </html>
  );
}
