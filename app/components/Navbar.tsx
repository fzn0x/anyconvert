import { useNavigate } from "@remix-run/react";

import { Button, Flex, Spacer, Box, Heading, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar () {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();

    const handleClick = () => {
        toggleColorMode();
        const styleEl = document.createElement('style');
        const cssText = document.createTextNode(
        'html * { transition: color, background-color 0.3s ease-out!important }',
        );
        styleEl.appendChild(cssText);
        document.head.appendChild(styleEl);
        setTimeout(() => {
        document.head.removeChild(styleEl);
        }, 300);
    };

    return (
      <Flex w="80%" direction={["column", "column", "row"]} m="auto" py={10}>
        <Box py='2'>
          <Heading fontWeight="900" size='md' onClick={() => navigate("/")} cursor="pointer">AnyConvert</Heading>
        </Box>
        <Spacer />
        <Flex py='2' gap={10} mr={[10, 20]} flexDirection="row">
          <Heading fontWeight="900" color={"gray.500"} size='md' onClick={() => navigate("/contact")} _hover={{ color: `text.${colorMode}` }} cursor="pointer">Contact</Heading>
          <Heading fontWeight="900" color={"gray.500"} size='md' onClick={() => navigate("/about")} _hover={{ color: `text.${colorMode}` }} cursor="pointer">About</Heading>
        </Flex>
        <Spacer />
        <Flex w="fit-content" p="3" cursor={"pointer"} bg="none" rounded="full" borderWidth="2px" borderColor={`gray.600`} _hover={{ borderColor: "white" }} onClick={handleClick}>
          {colorMode === 'light' ? <FaMoon color={`text.${colorMode}`}/> : <FaSun color={`text.${colorMode}`}/>}
        </Flex>
      </Flex>
    )
}