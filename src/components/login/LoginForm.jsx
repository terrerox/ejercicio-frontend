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
  useToast
} from '@chakra-ui/react'

export const LoginForm = () => {
  const [formValues, handleInputChange] = useForm({
      email: '',
      password: ''
  })
  const toast = useToast()
  const login = useUserStore(state => state.login)
  const { loggingIn } = useUserStore(state => state.status)

  const {email, password} = formValues

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formValues)
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
            <FormLabel>Email</FormLabel>
            <Input
                isRequired
                type="email" 
                name="email" 
                placeholder="email" 
                value={email}
                onChange={handleInputChange}
            />
            <FormLabel>Password</FormLabel>
            <Input
                isRequired
                type="password" 
                name="password" 
                placeholder="password" 
                password={password}
                onChange={handleInputChange}
            />
        </FormControl>
        <Button 
            isLoading={loggingIn}
            type="submit" 
            colorScheme='teal' 
            variant='outline' 
            width="full" 
            mt={4}
        >
            Log in
        </Button>
        <Text align="center"  mt="2px">
            Don't have an account?                            
            <Link as={ReachLink} ml="2px" color='teal' to="/register">
                Sign up
            </Link>
        </Text>
    </form>
  )
}
