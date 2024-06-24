import { Box, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import {ZodError, z} from "zod";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [user,setUser] = useState(null);

    const navigate = useNavigate();
    

    const [emailInput,setEmailInput] = useState();
    const [passwordInput,setPasswordInput] = useState();

    

    const handleEmailInput = (event) => {
        setEmailInput(event.target.value);
    }
    const handlePasswordInput = (event) => {
        setPasswordInput(event.target.value);
    }

    const userSchema = z.object({
        "email" : z.string().email(),
        "password" : z.string().min(8)
    })

    const validCredentials = () => {
        try{
            const user = userSchema.parse({
                "email" : emailInput,
                "password" : passwordInput
            })
            setUser(user)
            return true;
        }catch(error){
            if(error instanceof ZodError) {
                setUser(null);
                return false
            }
        }
    }

    useEffect(()=>{
        validCredentials()
    },[emailInput,passwordInput])

  return (
    <div>
        <Header title={"Login "}></Header>
        
        <Box display={"flex"}
        width={600}
        flexDirection={"column"} 
        gap={4} 
        margin={16}
        >
            <Input value={emailInput} 
            onChange={handleEmailInput}
            placeholder='Email' 
            width={600}/>
            <InputGroup size='md' width={"600px"}>
                
                <Input 
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    value={passwordInput}
                    onChange={handlePasswordInput}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button isDisabled={!user} onClick={()=>{navigate("/digimons/")}}>Conectar</Button>
        </Box>
    </div>
    
  )
}
export default LoginPage