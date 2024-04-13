import { useRef, useState } from 'react';

import type { MetaFunction } from "@remix-run/node";

import { Text, Flex, Button, Spacer, SimpleGrid, useDisclosure, Collapse, Box, Link, Image } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';

export const meta: MetaFunction = () => {
  return [
    { title: "AnyConvert | Ultimate Currency & Cryptocurrency Converter - Convert USD, BTC & More!" },
    { name: "description", content: "Ultimate Currency & Cryptocurrency Converter - Convert USD, BTC & More!" },
  ];
};

export default function Root() {
  const appReasonRef = useRef<null | HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  const { isOpen: isFAQScamToggle, onToggle: onFAQScamToggle } = useDisclosure();
  const { isOpen: isFAQAddCurrenciesToggle, onToggle: onFAQAddCurrenciesToggle } = useDisclosure();
  const { isOpen: isFAQSourceCodeToggle, onToggle: onFAQSourceCodeToggle } = useDisclosure();
  const { isOpen: isFAQFreeToggle, onToggle: onFAQFreeToggle } = useDisclosure();
  const { isOpen: isFAQContributeToggle, onToggle: onFAQContributeToggle } = useDisclosure();
  const { isOpen: isFAQReportToggle, onToggle: onFAQReportToggle } = useDisclosure();
  const { isOpen: isFAQRealTimeToggle, onToggle: onFAQRealTimeToggle } = useDisclosure();

  const goToReason = () => {
    appReasonRef?.current?.scrollIntoView({behavior: 'smooth'});
  };
  
  return (
    <>
      <Navbar/>
      <Flex direction="column" w="70%" m="auto" pt={20} minHeight="100vh">
        <Flex direction={["column-reverse", "column-reverse", "column-reverse", "column-reverse", "column-reverse", "row"]}>
          <Flex direction="column">
            <Text fontWeight="700" fontSize={["50px", "60px", "100px"]}>AnyConvert 💸</Text>
            <Text w={["80%", "80%", "60%"]} noOfLines={5} fontWeight="500" fontSize="30px">Ultimate Open Source Currency & Cryptocurrency Converter - Convert USD, BTC & More! </Text>

            <Button fontWeight={500} mt={10} w="200px" p={10} rounded="full" onClick={goToReason}>
              Why AnyConvert?
            </Button>
            <Link href='/app' isExternal>
              <Button gap={2} variant={"outline"} bg="none" fontWeight={500} mt={5} borderWidth="2px" w="200px" p={10} rounded="full" onMouseEnter={() => setIsHover(!isHover)} onMouseLeave={() => setIsHover(!isHover)}>
                Try Product {isHover && <LuExternalLink/>}
              </Button>
            </Link>
          </Flex>
          <Flex direction="column">
            <Image rounded="30" src="/app.png" />
          </Flex>
        </Flex>

        <Flex direction="column" mt={"100px"} py={0} ref={appReasonRef}>
          <Flex direction="column">
            <Text fontWeight="700" fontSize="4em" align="center">Your all in one currencies converter.</Text>
          </Flex>
          <Spacer/>
          <SimpleGrid columns={[1, 1, 3]} gap={20} my="10" color="black">
            <Flex 
              minHeight={["300px", "300px", "400px"]}
              direction="column" 
              bg="#f9da9a" 
              p="3" 
              borderColor="black" 
              borderWidth="5px"
              sx={{
                boxShadow: '13px 28px 0px 11px rgba(0,0,0,1)',
                WebkitBoxShadow: '13px 28px 0px 11px rgba(0,0,0,1)', // This is usually not necessary as Chakra UI uses emotion which handles vendor prefixing automatically.
                MozBoxShadow: '13px 28px 0px 11px rgba(0,0,0,1)', // Same as above, generally not needed.
              }}
            >
              <Text fontWeight="700" fontSize="4em">Reliable</Text>

              <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>
                We use various APIs to obtain price results. If one API fails, we retry with others to ensure the conversion works properly.
              </Text>
            </Flex>
            <Flex 
              minHeight={["300px", "300px", "400px"]}
              direction="column" 
              bg="#f9da9a" 
              p="3" 
              borderColor="black" 
              borderWidth="5px"
              sx={{
                boxShadow: '13px 28px 0px 11px rgba(0,0,0,1)',
                WebkitBoxShadow: '13px 28px 0px 11px rgba(0,0,0,1)', // This is usually not necessary as Chakra UI uses emotion which handles vendor prefixing automatically.
                MozBoxShadow: '13px 28px 0px 11px rgba(0,0,0,1)', // Same as above, generally not needed.
              }}
            >
              <Text fontWeight="700" fontSize="4em">Fast</Text>

              <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>
                We maintain high website uptime by utilizing cutting-edge technologies and optimizing performance to the fullest.
              </Text>
            </Flex>
            <Flex 
              minHeight={["300px", "300px", "400px"]}
              direction="column" 
              bg="#f9da9a" 
              p="3" 
              borderColor="black" 
              borderWidth="5px"
              sx={{
                boxShadow: '13px 28px 0px 11px rgba(0,0,0,1)',
                WebkitBoxShadow: '13px 28px 0px 11px rgba(0,0,0,1)', // This is usually not necessary as Chakra UI uses emotion which handles vendor prefixing automatically.
                MozBoxShadow: '13px 28px 0px 11px rgba(0,0,0,1)', // Same as above, generally not needed.
              }}
            >
              <Text fontWeight="700" fontSize="4em">Free</Text>

              <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>
                Anyone can register their currencies and cryptocurrencies for free by following our policy.
              </Text>
            </Flex>
          </SimpleGrid>
        </Flex>
        <Flex direction="column" mt={"100px"} py={10}>
          <Flex direction="column">
            <Text fontWeight="700" fontSize="4em" align="center">FAQs.</Text>
          </Flex>
          <Spacer/>
          <Flex direction="column" mt={5} gap={5}>
            <Flex direction="column" borderWidth="3px" p="5" rounded="lg">
              <Flex cursor="pointer" onClick={onFAQScamToggle}>
                <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>Is this website a scam?</Text>
              </Flex>
              <Collapse in={isFAQScamToggle} animateOpacity>
                <Box
                  p='40px'
                  color="black"
                  mt='4'
                  bg='#f9da9a'
                  rounded='md'
                  shadow='md'
                >
                  <Text fontWeight="500" fontSize="1em" whiteSpace={"pre-wrap"}>No, we don't take any profits from our users usage, you can use the conversion tool as much as you want.</Text>
                </Box>
              </Collapse>
            </Flex>
            <Flex direction="column" borderWidth="3px" p="5" rounded="lg">
              <Flex cursor="pointer" onClick={onFAQAddCurrenciesToggle}>
                <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>I want to add my currencies</Text>
              </Flex>
              <Collapse in={isFAQAddCurrenciesToggle} animateOpacity>
                <Box
                  p='40px'
                  color="black"
                  mt='4'
                  bg='#f9da9a'
                  rounded='md'
                  shadow='md'
                >
                  <Text fontWeight="500" fontSize="1em" whiteSpace={"pre-wrap"}>You can contact us from our contact page to do further processes.</Text>
                </Box>
              </Collapse>
            </Flex>
            <Flex direction="column" borderWidth="3px" p="5" rounded="lg">
              <Flex cursor="pointer" onClick={onFAQSourceCodeToggle}>
                <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>Where can I find your source code? </Text>
              </Flex>
              <Collapse in={isFAQSourceCodeToggle} animateOpacity>
                <Box
                  p='40px'
                  color="black"
                  mt='4'
                  bg='#f9da9a'
                  rounded='md'
                  shadow='md'
                >
                  <Text fontWeight="500" fontSize="1em" whiteSpace={"pre-wrap"}>You can click here to access AnyConvert github repository.</Text>
                </Box>
              </Collapse>
            </Flex>
            <Flex direction="column" borderWidth="3px" p="5" rounded="lg">
              <Flex cursor="pointer" onClick={onFAQFreeToggle}>
                <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>Why is this free? </Text>
              </Flex>
              <Collapse in={isFAQFreeToggle} animateOpacity>
                <Box
                  p='40px'
                  color="black"
                  mt='4'
                  bg='#f9da9a'
                  rounded='md'
                  shadow='md'
                >
                  <Text fontWeight="500" fontSize="1em" whiteSpace={"pre-wrap"}>AnyConvert was created by our solo developer Fauzan, Fauzan enjoy making apps.</Text>
                </Box>
              </Collapse>
            </Flex>
            <Flex direction="column" borderWidth="3px" p="5" rounded="lg">
              <Flex cursor="pointer" onClick={onFAQContributeToggle}>
                <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>Can I contribute to your app? </Text>
              </Flex>
              <Collapse in={isFAQContributeToggle} animateOpacity>
                <Box
                  p='40px'
                  color="black"
                  mt='4'
                  bg='#f9da9a'
                  rounded='md'
                  shadow='md'
                >
                 <Text fontWeight="500" fontSize="1em" whiteSpace={"pre-wrap"}> You can submit a contribution in AnyConvert github repository to fix any bugs you found on this website.</Text>
                </Box>
              </Collapse>
            </Flex>
            <Flex direction="column" borderWidth="3px" p="5" rounded="lg">
              <Flex cursor="pointer" onClick={onFAQRealTimeToggle}>
                <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>How to report any issues? </Text>
              </Flex>
              <Collapse in={isFAQRealTimeToggle} animateOpacity>
                <Box
                  p='40px'
                  color="black"
                  mt='4'
                  bg='#f9da9a'
                  rounded='md'
                  shadow='md'
                >
                  <Text fontWeight="500" fontSize="1em" whiteSpace={"pre-wrap"}>You can contact us from our contact page and explain your issues.</Text>
                </Box>
              </Collapse>
            </Flex>
            <Flex direction="column" borderWidth="3px" p="5" rounded="lg">
              <Flex cursor="pointer" onClick={onFAQReportToggle}>
                <Text fontWeight="500" fontSize="1.5em" whiteSpace={"pre-wrap"}>Is the price real-time? </Text>
              </Flex>
              <Collapse in={isFAQReportToggle} animateOpacity>
                <Box
                  p='40px'
                  color="black"
                  mt='4'
                  bg='#f9da9a'
                  rounded='md'
                  shadow='md'
                >
                  <Text fontWeight="500" fontSize="1em" whiteSpace={"pre-wrap"}>With over 15 exchange rate data sources, we use the mid-market rate for our currency rate converter, which is updated once a day to keep the app free (If massive inflation is detected and reported, we will run it outside the schedule.). This is for informational purposes only. The amount will differ when sending money through other platforms.</Text>
                </Box>
              </Collapse>
            </Flex>
          </Flex>
        </Flex>
        {/* <ul>
          {currencies.map((currency) => (
            <li key={currency.id}>
              <h1>{currency.currency_code}</h1>
              <p>{currency.currency_name}</p>
            </li>
          ))}
        </ul> */}
      </Flex>
      <Footer/>
    </>
  );
}
