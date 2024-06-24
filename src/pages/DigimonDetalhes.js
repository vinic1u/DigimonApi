import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Box, Button, Card, CardBody, CardFooter, Center, Divider, Flex, Heading, Image, Link, ListItem, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const DigimonDetalhes = () => {

    const {id} = useParams();
    const [digimon, setDigimon] = useState(null);

    const digimonPage = "http://localhost:3000/digimons/digimon/";

    const getDigimon = async () => {
        try{
            const response = await axios.get(`https://digi-api.com/api/v1/digimon/${id}`)
            setDigimon(response.data);
        }catch(error){
            console.log(error);
        }
    }



    useEffect(() => {
      getDigimon();
    }, [id]);


    if(!digimon){
        return (
            <div>Carregando...</div>
        )
    }
    
    return (
        <div>
            <Header title={"Digimon Detalhes"}></Header>
            <Flex justifyContent={"start"}  margin={16} gap={16}>
                <Card maxW='sm'>
                    <CardBody>
                        <Image
                        width={320} 
                        height={320} 
                        src={digimon.images[0].href}
                        alt={digimon.name}
                        borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                        <Heading size='md'>{digimon.name}</Heading>
                        <Text>
                            {digimon.descriptions[1] ? digimon.descriptions[1].description : "Sem Descrição"}
                        </Text>
                        </Stack>
                    </CardBody>

                    <Divider borderColor={"black"}/>
                    
                    <CardFooter display={"flex"} flexDirection={"column"} gap={4}>
                        <Stack>
                            <Text fontSize={"20px"} fontWeight={"bold"}>Fields</Text>
                            {digimon.fields.map((field)=> 
                            <Flex gap={4}> 
                                <Image src={field.image}></Image>
                                <Text>{field.field}</Text>
                            </Flex>
                            )}
                        </Stack>
                       
                       <Stack>
                            <Text fontSize={"20px"} fontWeight={"bold"}>Tipos</Text>
                                {digimon.types.map((type) => 
                                <li key={type.id}>
                                    {type.type}
                                </li>
                            )}
                        </Stack>
                          
                        <Stack>
                            <Text fontSize={"20px"} fontWeight={"bold"}>Atributos</Text>
                            {digimon.attributes.map((atribute) => 
                                <li key={atribute.id}>
                                    {atribute.attribute}
                                </li>
                            )}
                        </Stack>

                    </CardFooter>
                </Card>

                
                
                <TableContainer>
                <Text fontSize={"20px"} 
                fontWeight={"bold"} marginBottom={4}
                 textAlign={"center"}>Lista de Habilidades</Text>
                    <Table variant='simple' size={"md"}>
                        <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Habilidade</Th>
                            <Th>Descrição</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {digimon.skills.map((skill)=> 
                            <Tr>
                                <Td>{skill.id}</Td>
                                <Td>{skill.skill}</Td>
                                <Td>{skill.description} </Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </TableContainer>
                
                
            </Flex>

            <Flex justifyContent={"start"} margin={16} flexDirection={"column"}>
            <Text fontSize={"20px"} 
            fontWeight={"bold"}
             marginBottom={4} 
             textAlign={"center"}>Lista de DigiEvoluções</Text>
                <TableContainer>
                <Box overflowY="auto" maxHeight="500px">
                        <Table variant='simple' size={"md"}>
                            <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Nome</Th>
                                <Th>Condições para Evolução</Th>
                                <Th>Link da Evolução</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {digimon.nextEvolutions.map((evolution)=> 
                                <Tr>
                                    <Td>{evolution.id}</Td>
                                    <Td>{evolution.digimon}</Td>
                                    <Td>{evolution.condition} </Td>
                                    <Td color={"blue.400"}>
                                        <a href={digimonPage+evolution.id} target="_blank" rel="noreferrer">{evolution.url}</a>
                                        </Td>
                                </Tr>)}
                            </Tbody>
                        </Table>
                    </Box>
                    </TableContainer>
                    
                    
                </Flex>
                        
        </div>    
    )
}
export default DigimonDetalhes;