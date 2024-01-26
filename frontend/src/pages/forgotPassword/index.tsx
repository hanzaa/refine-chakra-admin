import { AuthPage } from "../../components/pages/auth";
import { Img } from "@chakra-ui/react";
export const ForgotPassword = () => {
   return (
      <AuthPage
         type="forgotPassword"
         title={<Img src="./zeal-horizontal.png" width={290} alt="zeal-logo" />}
      />
   );
};
