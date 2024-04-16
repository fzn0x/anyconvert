import { useNavigate } from "@remix-run/react";

import { Text, Flex, Spacer, Box, Link } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { FaMastodon, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Navbar () {
    const navigate = useNavigate();

    return (
      <Flex w="80%" direction={["column", "column", "row"]} align="center" m="auto" py={10} mt="auto">
        <Box p="2">
          <Text fontWeight="900" size="md" onClick={() => navigate("/")} cursor="pointer">All rights reserved © AnyConvert Author 2024</Text>
        </Box>
        <Spacer />
        <Text mr={["none", "none", 10, 20]} fontWeight="100" size="md" m="auto" onClick={() => navigate("/")} cursor="pointer">AnyConvert 0.0.2</Text>
        <Spacer />
        <Flex p="2" gap={10}>
            <Link cursor="pointer" href="https://www.instagram.com/fzn0x/" isExternal><RiInstagramFill size="30"/></Link>
            <Link cursor="pointer" href="https://twitter.com/fzn0x" isExternal><FaTwitter size="30"/></Link>
            <Link cursor="pointer" href="https://mastodon.social/@fzn0x" isExternal><FaMastodon size="30"/></Link>
            <Link cursor="pointer" href="https://github.com/fzn0x" isExternal><AiFillGithub size="30"/></Link>
        </Flex>
      </Flex>
    )
}