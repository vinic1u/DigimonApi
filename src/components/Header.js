import { Flex, Text } from "@chakra-ui/react";

const Header = ({title}) => {
    return (
        <Flex padding={8} bgColor={"red.400"}>
            <Text fontSize={"24px"} color={"white"}>{title}</Text>
        </Flex>
    );
}

export default Header;