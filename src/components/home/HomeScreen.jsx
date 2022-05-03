import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from "../../store"
import { UsersTable } from './UsersTable'
import {
  Container,
  Button,
  Flex,
  Text,
  Spinner
} from '@chakra-ui/react'

export const HomeScreen = () => {
  const getUsers = useUserStore(state => state.getUsers)
  const loading = useUserStore(state => state.loading)
  const logout = useUserStore(state => state.logout)
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  }, [])
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <Container maxW='90%'>
        <Flex alignItems="center" justifyContent="space-between">
            <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Users list
            </Text>
            <Button 
              onClick={handleLogout}
              type="submit" 
              colorScheme='teal' 
              variant='outline' 
              mt={4}
            >
              Logout
            </Button>
        </Flex>
        {
          loading ? (
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='teal'
              size='xl'
            />
          ) : (
            <UsersTable />
          )
        }        

    </Container>
  )
}
