import { useLoaderData } from "@remix-run/react";

import type { MetaFunction } from "@remix-run/node";

import { Text, Flex, Button } from "@chakra-ui/react";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "AnyConvert | Contact Us" },
    { name: "description", content: "Contact Us" },
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
            Contact
          </Text>
          <Text
            w={["100%", "40%"]}
            noOfLines={3}
            fontWeight="500"
            fontSize={["20px", "30px"]}
          >
            developerfauzan@gmail.com
          </Text>
          {/* https://www.linkedin.com/pulse/write-less-say-more-tips-succinct-engaging-email-content-minal-patel-b2zfe/ */}
          <Text w="100%" fontWeight="500" fontSize={["20px", "30px"]}>
            Your time is important to me; please ensure communications are
            concise and to the point. For questions regarding this application,
            we encourage utilizing the github repository issues.
          </Text>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
