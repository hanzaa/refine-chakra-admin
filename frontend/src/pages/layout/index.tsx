import { ThemedLayoutV2 } from "../../components/layout";
import { ReactNode } from "react";
import { ThemedHeaderV2 } from "../../components/layout/header";
import { ThemedSiderV2 } from "../../components/layout/sider";
import { ThemedTitleV2 } from "../../components/layout/title";

export const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <ThemedLayoutV2
         Header={ThemedHeaderV2}
         Sider={ThemedSiderV2}
         Title={({ collapsed }) => {
            return <ThemedTitleV2 collapsed={collapsed} />;
         }}
      >
         {children}
      </ThemedLayoutV2>
   );
};
