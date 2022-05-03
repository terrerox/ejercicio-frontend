import { Link as ReachLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm"
import { useUserStore } from "../../store"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Text,
  SimpleGrid,
  useToast
} from '@chakra-ui/react'

export const RegisterForm = () => {
  const [formValues, handleInputChange] = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    verify_password: '',
  })
  const toast = useToast()
  const register = useUserStore(state => state.register)
  const { registering } = useUserStore(state => state.status)

  const {
    firstname,
    lastname,
    email,
    password,
    verify_password,
  } = formValues

  const handleSubmit = (e) => {
    e.preventDefault()
    register(formValues)
      .then(res => {
        if(!res.success) {
          return toast({
            title: "Error",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      })
  }
  return (
    <form onSubmit={ handleSubmit }>
      <FormControl>
        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
            <FormControl>
                <FormLabel>Firstname</FormLabel>
                <Input
                    isRequired
                    type="text" 
                    name="firstname" 
                    placeholder="firstname" 
                    value={firstname}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Lastname</FormLabel>
                <Input
                    isRequired
                    type="text" 
                    name="lastname" 
                    placeholder="lastname" 
                    value={lastname}
                    onChange={handleInputChange}
                />
            </FormControl>
        </SimpleGrid>
        <FormLabel>Email</FormLabel>
        <Input 
            isRequired
            type="email" 
            name="email" 
            placeholder="email" 
            value={email}
            onChange={handleInputChange}
        />
        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    isRequired
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={password}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Verify password</FormLabel>
                <Input
                    isRequired
                    type="password" 
                    name="verify_password" 
                    placeholder="verify password" 
                    value={verify_password}
                    onChange={handleInputChange}
                />
            </FormControl>
        </SimpleGrid>
      </FormControl>
      <Button 
        isLoading={registering}
        type="submit" 
        colorScheme='teal' 
        variant='outline' 
        width="full" 
        mt={4}
      >
        Sign up
      </Button>
      <Text align="center"  mt="2px">
          Have an account?                             
          <Link as={ReachLink} ml="2px" color='teal' to="/login">
              Log in
          </Link>
      </Text>
    </form>
  )
}
