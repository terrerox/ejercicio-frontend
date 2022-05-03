import { RegisterForm } from "./RegisterForm"
import {
  Flex,
  Box,
  Heading
} from '@chakra-ui/react'

export const RegisterScreen = () => {
  return (
    <Flex mt="10%" align="center" justifyContent="center">
        <Box p={10} bg="white" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box textAlign="center">
                <Heading>Sign up</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <RegisterForm />
            </Box>
        </Box>
    </Flex>
  )
}
