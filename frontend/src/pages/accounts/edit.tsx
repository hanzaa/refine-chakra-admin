import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const AccountEdit: React.FC<IResourceComponentsProps> = () => {
   const {
      refineCore: { formLoading, queryResult },
      saveButtonProps,
      register,
      setValue,
      formState: { errors },
   } = useForm();

   const accountsData = queryResult?.data?.data;

   return (
      <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
         <FormControl mb="3" isInvalid={!!(errors as any)?.id}>
            <FormLabel>Id</FormLabel>
            <Input
               disabled
               type="number"
               {...register("id", {
                  required: "This field is required",
                  valueAsNumber: true,
               })}
            />
            <FormErrorMessage>
               {(errors as any)?.id?.message as string}
            </FormErrorMessage>
         </FormControl>

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
         <FormControl mb="3" isInvalid={!!(errors as any)?.role}>
            <FormLabel>Role</FormLabel>
            <Input
               type="text"
               {...register("role", {
                  required: "This field is required",
               })}
            />
            <FormErrorMessage>
               {(errors as any)?.role?.message as string}
            </FormErrorMessage>
         </FormControl>
         {/* 
                    DatePicker component is not included in "@refinedev/chakra-ui" package.
                    To use a <DatePicker> component, you can examine the following links:
                    
                    - https://github.com/aboveyunhai/chakra-dayzed-datepicker
                    - https://github.com/wojtekmaj/react-date-picker
                */}
         <FormControl mb="3" isInvalid={!!(errors as any)?.date_created}>
            <FormLabel>Date Created</FormLabel>
            <Input
                disabled
                type="text"
               {...register("date_created", {
                  required: "This field is required",
               })}
            />
            <FormErrorMessage>
               {(errors as any)?.date_created?.message as string}
            </FormErrorMessage>
         </FormControl>
         <FormControl mb="3" isInvalid={!!(errors as any)?.time_created}>
            <FormLabel>Time Created</FormLabel>
            <Input
                disabled
               type="text"
               {...register("time_created", {
                  required: "This field is required",
               })}
            />
            <FormErrorMessage>
               {(errors as any)?.time_created?.message as string}
            </FormErrorMessage>
         </FormControl>
      </Edit>
   );
};
