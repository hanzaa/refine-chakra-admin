import { AuthPage } from "../../components/pages/auth";
import { Img, Heading, Box } from "@chakra-ui/react";

export const Register = () => {
   return (
      <AuthPage
         type="register"
         title={<Img src="./zeal-horizontal.png" width={290} alt="zeal-logo" />}
         renderContent={(content: React.ReactNode, title: React.ReactNode) => {
            return (
               <Box
                  bg="white"
                  borderRadius="md"
                  px="5"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
               >
                  {title}
                  {content}
               </Box>
            );
         }}
      />
   );
};
