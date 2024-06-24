import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Image, Stack, Text, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DigimonList = () => {


    const [digimons,setDigimon] = useState([]);
    const [proximaPaginaUrl,setProximaPaginaUrl] = useState();
    const [paginaAnteriorUrl,setPaginaAnteriorUrl] = useState();

    

    const toast = useToast();

    const getDigimon = async (pageUrl = "https://digi-api.com/api/v1/digimon?page=0&pageSize=12") => {
        try{
            const response = await axios.get(pageUrl)
            setDigimon(response.data.content);
            setProximaPaginaUrl(response.data.pageable.nextPage);
            setPaginaAnteriorUrl(response.data.pageable.previousPage);
           
        }catch(error){
            toast({
                title: 'Erro',
                description: "Houve um erro ao consultar a API",
                status: 'error',
                duration: 2000,
                isClosable: true,
              })
        }
    }

    useEffect(()=>{
        getDigimon()
    },[])

    if(!digimons.length){
        return (
            <div>Carregando.....</div>
        )
    }
        

    return (
        <div>
            <Header title={"Listagem de Digimons"}></Header>
            <Flex 
            justifyContent={"center"} 
            alignItems={"center"} 
            margin={16} gap={8} 
            flexWrap={"wrap"}
            >
                {digimons.map((digimon) => (
                    <Link to={`/digimons/digimon/${digimon.id}`}>
                        <Card maxW='sm' 
                        key={digimon.id} 
                        width={"256px"}
                        height={"400px"}
                        alignItems={"center"} 
                        >
                            <CardHeader>
                                <Text textAlign={"center"}>ID:{digimon.id}</Text>
                            </CardHeader>
                            <CardBody >
                            <Image
                                width={"216"}
                                height={"216"}
                                src={digimon.image}
                                alt={digimon.name}
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading textAlign={"center"} size='md'>{digimon.name}</Heading>
                            </Stack>
                            </CardBody>
                    </Card>
                  </Link>
                ))}
            
            </Flex>
            <Flex justifyContent={"space-between"} marginLeft={24} marginRight={24}>
            <Button 
                    onClick={() => {
                        if (paginaAnteriorUrl) getDigimon(paginaAnteriorUrl);
                    }}
                    isDisabled={!paginaAnteriorUrl}
                >
                    Pagina Anterior
                </Button>
                <Button 
                    onClick={() => {
                        if (proximaPaginaUrl) getDigimon(proximaPaginaUrl);
                    }}
                    isDisabled={!proximaPaginaUrl}
                >
                Proxima Pagina
                </Button>

            </Flex>
        </div>
    );
}
export default DigimonList;