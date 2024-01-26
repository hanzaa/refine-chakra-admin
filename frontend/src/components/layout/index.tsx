import { Box } from "@chakra-ui/react";
import React from "react";
import { ThemedLayoutContextProvider } from "@refinedev/chakra-ui";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import type { RefineThemedLayoutV2Props } from "@refinedev/chakra-ui";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
  initialSiderCollapsed,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <Box display="flex">
        <SiderToRender Title={Title} />
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          minH="100vh"
          overflow="clip"
        >
          <HeaderToRender />
          <Box p={[2, 4]}>{children}</Box>
          {Footer && <Footer />}
        </Box>
        {OffLayoutArea && <OffLayoutArea />}
      </Box>
    </ThemedLayoutContextProvider>
  );
};
