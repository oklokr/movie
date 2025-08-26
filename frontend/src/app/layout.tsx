import { ModalManager } from "@/components/ui/modal/alert";
import "./globals.scss";
import ReduxProvider from "@/redux/reduxProvider";
import DeafultLayout from "@/components/layout/defultLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>
          <DeafultLayout>{children}</DeafultLayout>
          <ModalManager />
        </ReduxProvider>
      </body>
    </html>
  );
}
