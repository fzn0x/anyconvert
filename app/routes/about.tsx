import { useLoaderData } from "@remix-run/react";

import type { MetaFunction } from "@remix-run/node";

import { Text, Flex, Button } from "@chakra-ui/react";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "AnyConvert | About Us" },
    { name: "description", content: "About Us" },
  ];
};

export default function Root() {
  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        w={["80%", "60%"]}
        m="auto"
        pt={20}
        minHeight="100vh"
      >
        <Flex direction="column" gap={10}>
          <Text fontWeight="700" fontSize={["50px", "100px"]}>
            About Us
          </Text>
          <Text
            w="100%"
            fontWeight="500"
            fontSize={["20px", "30px"]}
            whiteSpace={"pre-wrap"}
          >
            AnyConvert was initiated by Muhammad Fauzan and maintained by the
            Community, Muhammad Fauzan is the Founder of AnyConvert and CTO of
            SpellCode.inc. {"\n\n"}
            You can use this app to track convertion rates of any listed
            currencies and cryptocurrencies for <b>free</b> and we will{" "}
            <i>never</i> accept any offers to commercialize this product.
          </Text>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
