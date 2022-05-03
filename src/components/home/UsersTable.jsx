import { useUserStore } from "../../store"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Flex,
    useToast
} from '@chakra-ui/react'
export const UsersTable = () => {
  const users = useUserStore(state => state.users)

  return (
    <Table variant='striped' colorScheme='teal'>
        <Thead>
            <Tr>
                <Th>Username</Th>
                <Th>Firstname</Th>
                <Th>Lastname</Th>
                <Th>Email</Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                users.map(user => (
                    <Tr key={user.id}>
                        <Td>{user.displayname}</Td>
                        <Td>{user.firstname}</Td>
                        <Td>{user.lastname}</Td>
                        <Td>{user.email}</Td>
                    </Tr>
                ))
            }
        </Tbody>
        <Tfoot>
            <Tr>
                <Th>Username</Th>
                <Th>Firstname</Th>
                <Th>Lastname</Th>
                <Th>Email</Th>
            </Tr>
        </Tfoot>
    </Table>
  )
}
