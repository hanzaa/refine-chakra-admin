import {
   Box,
   BoxProps,
   Button,
   Divider,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Heading,
   Input,
   Radio,
   RadioGroup,
   Stack,
   VStack,
   Link as ChakraLink,
   useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import {
   useTranslate,
   useRouterType,
   useLink,
   useRouterContext,
   useRegister,
   RegisterPageProps,
   RegisterFormTypes,
   BaseRecord,
   HttpError,
   useActiveAuthProvider,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/chakra-ui";
import { FormPropsType } from "../index";
import { layoutProps, cardProps } from "./styles";
import { Form } from "react-hook-form";

interface CustomRegisterFormTypes {
   username?: string;
   role?: string;
   email?: string;
   password?: string;
   passwordConfirm?: string;
   providerName?: string;
}

type RegisterProps = RegisterPageProps<
   BoxProps,
   BoxProps,
   FormPropsType<CustomRegisterFormTypes>
>;

export const RegisterPage: React.FC<RegisterProps> = ({
   providers,
   loginLink,
   wrapperProps,
   contentProps,
   renderContent,
   formProps,
   title,
   hideForm,
}) => {
   const { onSubmit, ...useFormProps } = formProps || {};

   const routerType = useRouterType();
   const NewLink = useLink();
   const { Link: LegacyLink } = useRouterContext();
   const Link = routerType === "legacy" ? LegacyLink : NewLink;
   const translate = useTranslate();
   const authProvider = useActiveAuthProvider();
   const { mutate } = useRegister({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
   });
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<BaseRecord, HttpError, CustomRegisterFormTypes>({
      ...useFormProps,
   });

   const renderProviders = () => {
      if (providers && providers.length > 0) {
         return (
            <>
               <VStack>
                  {providers.map((provider) => (
                     <Button
                        key={provider.name}
                        variant="outline"
                        fontSize="sm"
                        width="full"
                        leftIcon={<>{provider?.icon}</>}
                        onClick={() =>
                           mutate({
                              providerName: provider.name,
                           })
                        }
                     >
                        {provider.label ?? <label>{provider.label}</label>}
                     </Button>
                  ))}
               </VStack>
               {!hideForm && <Divider my="6" />}
            </>
         );
      }
      return null;
   };

   const importantTextColor = useColorModeValue("brand.500", "brand.200");

   const PageTitle =
      title === false ? null : (
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               marginBottom: "32px",
               fontSize: "20px",
            }}
         >
            {title ?? <ThemedTitleV2 collapsed={false} />}
         </div>
      );

   const allContentProps = { ...cardProps, ...contentProps };
   const content = (
      <Box
         bg="chakra-body-bg"
         borderWidth="1px"
         borderColor={useColorModeValue("gray.200", "gray.700")}
         backgroundColor={useColorModeValue("white", "gray.800")}
         {...allContentProps}
      >
         <Heading
            mb="8"
            textAlign="center"
            fontSize="2xl"
            color={importantTextColor}
         >
            {translate("pages.register.title", "Sign up for your account")}
         </Heading>
         {renderProviders()}
         {!hideForm && (
            <form
               onSubmit={handleSubmit((data) => {
                  if (onSubmit) {
                     return onSubmit(data);
                  }

                  return mutate(data);
               })}
            >
               <FormControl mt="6" isInvalid={!!errors?.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                     id="username"
                     type="text"
                     placeholder="Username"
                     {...register("username", {
                        required: "required",
                     })}
                  />
                  <FormErrorMessage>{`${errors.username?.message}`}</FormErrorMessage>
               </FormControl>

               <FormControl mt="6" isInvalid={!!errors?.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                     id="email"
                     type="email"
                     placeholder="Email"
                     {...register("email", {
                        required: "required",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "Invalid email address",
                        },
                     })}
                  />
                  <FormErrorMessage>{`${errors.email?.message}`}</FormErrorMessage>
               </FormControl>

               <FormControl mt="6" isInvalid={!!errors?.password}>
                  <FormLabel htmlFor="password">{"Password"}</FormLabel>
                  <Input
                     id="password"
                     type="password"
                     placeholder="Password"
                     {...register("password", {
                        required: "required",
                     })}
                  />
                  <FormErrorMessage>{`${errors.password?.message}`}</FormErrorMessage>
               </FormControl>

               <FormControl mt="6" isInvalid={!!errors?.passwordConfirm}>
                  <FormLabel htmlFor="passwordConfirmation">{"Confirm Password"}</FormLabel>
                  <Input
                     id="passwordConfirm"
                     type="password"
                     placeholder="Confirm Password"
                     {...register("passwordConfirm", {
                        required: "required",
                        validate: (value) => value === watch("password") || "Passwords do not match"
                     })}
                  />
                  <FormErrorMessage>{`${errors.passwordConfirm?.message}`}</FormErrorMessage>
               </FormControl>

               <FormControl mt="6" isInvalid={!!errors.role}>
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <RadioGroup name="role-options" defaultValue="staff">
                     <Stack spacing={4} direction="row">
                        <Radio
                           value="staff"
                           {...register("role", { required: true })}
                        >
                           Staff
                        </Radio>
                        <Radio
                           value="pejabat"
                           {...register("role", { required: true })}
                        >
                           Pejabat
                        </Radio>
                     </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{`${errors.role?.message}`}</FormErrorMessage>
               </FormControl>

               <Button mt="6" type="submit" width="full" colorScheme="brand">
                  {"Sign up"}
               </Button>

               {loginLink ?? (
                  <Box
                     display="flex"
                     justifyContent="flex-end"
                     mt="6"
                     fontSize="12px"
                  >
                     <span>
                        {translate(
                           "pages.login.buttons.haveAccount",
                           "Have an account?"
                        )}
                     </span>
                     <ChakraLink
                        color={importantTextColor}
                        ml="1"
                        fontWeight="bold"
                        as={Link}
                        to="/login"
                     >
                        {translate("pages.login.signin", "Sign in")}
                     </ChakraLink>
                  </Box>
               )}
            </form>
         )}

         {hideForm && loginLink !== false && (
            <Box mt={6} textAlign="center">
               <span>
                  {translate(
                     "pages.login.buttons.noAccount",
                     "Don’t have an account?"
                  )}
               </span>
               <ChakraLink
                  color={importantTextColor}
                  ml="1"
                  as={Link}
                  fontWeight="bold"
                  to="/login"
               >
                  {translate("pages.login.signin", "Sign in")}
               </ChakraLink>
            </Box>
         )}
      </Box>
   );

   return (
      <Box
         style={{
            ...layoutProps,
            justifyContent: hideForm ? "flex-start" : "center",
            paddingTop: hideForm ? "15dvh" : "16px",
         }}
         {...wrapperProps}
      >
         {renderContent ? (
            renderContent(content, PageTitle)
         ) : (
            <>
               {PageTitle}
               {content}
            </>
         )}
      </Box>
   );
};
