import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    EmailField,
    DateField,
} from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export const AccountShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm" mt={4}>
                Id
            </Heading>
            <NumberField value={record?.id ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Username
            </Heading>
            <TextField value={record?.username} />
            <Heading as="h5" size="sm" mt={4}>
                Email
            </Heading>
            <EmailField value={record?.email} />
            <Heading as="h5" size="sm" mt={4}>
                Password
            </Heading>
            <TextField value={record?.password} />
            <Heading as="h5" size="sm" mt={4}>
                Role
            </Heading>
            <TextField value={record?.role} />
            <Heading as="h5" size="sm" mt={4}>
                Date Created
            </Heading>
            <DateField value={record?.date_created} />
            <Heading as="h5" size="sm" mt={4}>
                Time Created
            </Heading>
            <TextField value={record?.time_created} />
        </Show>
    );
};
