import { IResourceComponentsProps } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   Input,
   Radio,
   RadioGroup,
   Stack,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const AccountCreate: React.FC<IResourceComponentsProps> = () => {
   const {
      refineCore: { formLoading },
      saveButtonProps,
      register,
      watch,
      formState: { errors },
   } = useForm();

   return (
      <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
         <FormControl mb="3" isInvalid={!!(errors as any)?.username}>
            <FormLabel>Username</FormLabel>
            <Input
               type="text"
               {...register("username", {
                  required: "This field is required",
               })}
            />
            <FormErrorMessage>
               {(errors as any)?.username?.message as string}
            </FormErrorMessage>
         </FormControl>
         
         <FormControl mb="3" isInvalid={!!(errors as any)?.email}>
            <FormLabel>Email</FormLabel>
            <Input
               type="email"
               {...register("email", {
                  required: "This field is required",
                  pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                     message: "Invalid email address",
                  },
               })}
            />
            <FormErrorMessage>
               {(errors as any)?.email?.message as string}
            </FormErrorMessage>
         </FormControl>
         
         <FormControl mb="3" isInvalid={!!(errors as any)?.password}>
            <FormLabel>Password</FormLabel>
            <Input
               type="text"
               {...register("password", {
                  required: "This field is required",
               })}
            />
            <FormErrorMessage>
               {(errors as any)?.password?.message as string}
            </FormErrorMessage>
         </FormControl>

         <FormControl mt="6" isInvalid={!!errors?.passwordConfirm}>
            <FormLabel htmlFor="passwordConfirmation">
               {"Confirm Password"}
            </FormLabel>
            <Input
               id="passwordConfirm"
               type="password"
               placeholder="Confirm Password"
               {...register("passwordConfirm", {
                  required: "required",
                  validate: (value) =>
                     value === watch("password") || "Passwords do not match",
               })}
            />
            <FormErrorMessage>{`${errors.passwordConfirm?.message}`}</FormErrorMessage>
         </FormControl>

         <FormControl mt="3" isInvalid={!!errors.role}>
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
      </Create>
   );
};
