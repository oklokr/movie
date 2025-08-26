"use client";

import store from "@/redux/store";
import { Provider } from "react-redux";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientLayout;
