import {
   Link as ChakraLink,
   HStack,
   Img,
} from "@chakra-ui/react";
import React from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import type { RefineLayoutThemedTitleProps } from "@refinedev/chakra-ui";


export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
   collapsed,
   wrapperStyles,
}) => {
   const routerType = useRouterType();
   const Link = useLink();
   const { Link: LegacyLink } = useRouterContext();

   const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

   return (
      <ChakraLink
         as={ActiveLink}
         to="/"
         fontSize="inherit"
         textDecoration="none"
         _hover={{
            textDecoration: "none",
         }}
      >
         <HStack
            spacing="8px"
            justifyContent="center"
            alignItems="center"
            fontSize="inherit"
            style={{
               ...wrapperStyles,
            }}
         >
           {!collapsed && (
              <Img src={"./zeal-horizontal.png"} width={40} alt="zeal-logo" />
           )}
            {collapsed && (
               <Img src={"./zeal-logo.png"} width={23} alt="zeal-logo" />
            )}
         </HStack>
      </ChakraLink>
   );
};
