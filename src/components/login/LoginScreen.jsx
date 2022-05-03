import { LoginForm } from "./LoginForm"
import {
  Flex,
  Box,
  Heading
} from '@chakra-ui/react'
export const LoginScreen = () => {
  return (
    <Flex mt="10%" align="center" justifyContent="center">
        <Box p={10} bg="white" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box textAlign="center">
                <Heading>Log in</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <LoginForm />
            </Box>
        </Box>
    </Flex>
  )
}
