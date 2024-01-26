import { AuthPage } from "../../components/pages/auth";
import { Img } from "@chakra-ui/react";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={<Img src="./zeal-horizontal.png" width={290} alt="zeal-logo" />}
      rememberMe={false}
      forgotPasswordLink={false}
    />
  );
};
