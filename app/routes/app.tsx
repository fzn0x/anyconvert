import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { MetaFunction } from "@remix-run/node";
import { httpBatchLink, createTRPCClient } from '@trpc/client';
import type { AppRouter } from 'anyconvert-backend-api';

import Select, { createFilter, OptionProps, CSSObjectWithLabel, components, MenuListProps, SelectInstance } from 'react-select'
import { FixedSizeList } from 'react-window'

import {
  Flex,
  Box,
  Text,
  Input,
  Button,
  Container,
  VStack,
  useToast,
  Link,
  Switch,
} from '@chakra-ui/react';

import { IoInformationCircleOutline } from "react-icons/io5";

import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';

export const meta: MetaFunction = () => {
  return [
    { title: "AnyConvert | App" },
    { name: "description", content: "App" },
  ];
};

export default function Root() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | null>(null);
  const [fromCurrencies, setFromCurrencies] = useState([]);
  const [toCurrencies, setToCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [currencyType, setCurrencyType] = useState("Cryptocurrency");
  const setFromCurrencySelectRef = useRef<SelectInstance<SelectOption> | null>(null);
  const setToCurrencySelectRef = useRef<SelectInstance<SelectOption> | null>(null);

  const toast = useToast();

  const trpc = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'https://fzn0x.rocks/trpc',
      }),
    ],
  });

  const handleConversion = (rate: number) => {
    const convertedAmount = (amount || 0) * rate;
    
    return convertedAmount;
  };

  async function getCryptocurrencyRates() {
    try {
      const rates = await trpc.rates.query({
        from: fromCurrency,
        to: toCurrency,
      })

      const convertedAmount = handleConversion(Number(rates?.[0]?.rate));

      setResult(convertedAmount);

      toast({
        title: 'Conversion completed.',
        description: `Converted ${amount} ${fromCurrency.toUpperCase()} to ${(convertedAmount || 0).toFixed(20).replace(/\.0+$/, "")} ${toCurrency.toUpperCase()}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: 'Conversion failed.',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  }

  async function getCurrencyRates() {
    try {
      const fromRates = await trpc.rates.query({
        from: fromCurrency,
        to: "EUR",
      })

      const toRates = await trpc.rates.query({
        from: toCurrency,
        to: "EUR",
      })

      const convertedAmount = handleConversion((1 / Number( fromRates?.[0]?.rate)) * Number(toRates?.[0]?.rate));

      setResult(convertedAmount);

      toast({
        title: 'Conversion completed.',
        description: `Converted ${amount} ${fromCurrency.toUpperCase()} to ${(convertedAmount || 0).toFixed(20).replace(/\.0+$/, "")} ${toCurrency.toUpperCase()}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: 'Conversion failed.',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  }

  async function getFromCurrencies (type = "currencies") {
    const currencies = await trpc.currencies.query({
      type: type,
    })

    if (currencies.length) {
      setFromCurrencies(currencies);
    }
    
    return currencies;
  }

  async function getToCurrencies (type = "currencies") {
    const currencies = await trpc.currencies.query({
      type: type,
    })

    if (currencies.length) {
      setToCurrencies(currencies);
    }

    return currencies;
  }

  useEffect(() => {
    setResult(null);
    setFromCurrency("");
    setToCurrency("");
    setAmount(null);
    setFromCurrencySelectRef?.current?.clearValue();
    setToCurrencySelectRef?.current?.clearValue();

    if (currencyType === "Cryptocurrency") {
      getFromCurrencies("cryptocurrencies");
      getToCurrencies("vs_cryptocurrencies");
    }

    if (currencyType === "Currency") {
      getFromCurrencies("currencies");
      getToCurrencies("currencies");
    }
  }, [currencyType]);

  const customStyles = {
    container: (provided: CSSObjectWithLabel) => ({
      ...provided,
      width: "100%",
    })
  };

  type SelectOption = {
    value: string
    label: string
  }

  const OptimizedMenuList = (props: MenuListProps<SelectOption>) => {
    const { options, children, maxHeight, getValue } = props
    if (!children || !Array.isArray(children)) return null

    const height = 35
    const selectedValues = getValue() as SelectOption[];
    const initialOffset = selectedValues[0] ? options.indexOf(selectedValues[0]) * height : 0

    return (
      <FixedSizeList
        width={''}
        itemSize={height}
        height={maxHeight}
        itemCount={children.length}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => (
          <div className="option-wrapper" style={style}>
            {children[index]}
          </div>
        )}
      </FixedSizeList>
    )
  }

  const OptimizedOption = (props: OptionProps<SelectOption>) => {
    const {innerProps, ...otherProps} = props;
    const {onMouseMove, onMouseOver, ...otherInnerProps} = innerProps;
    const newProps = {innerProps: {...otherInnerProps}, ...otherProps};
    delete props.innerProps.onMouseMove;
    delete props.innerProps.onMouseOver;
    return <components.Option className="custom-select-option" isFocused={false} {...newProps}>{props.children}</components.Option>;
  }

  const optimizeSelect = {
    components: {
      MenuList: OptimizedMenuList,
      Option: OptimizedOption,
    },
  }

  return (
    <>
      <Navbar/>
      <Flex 
        color="black" 
        direction={"column"}
        w={["90%", "80%", "40%"]}
        h="max-content"
        m="auto" 
        py={20} 
        rounded="50"
        mb={20}
        minHeight="100vh" 
        bg="white"
        borderColor="black" 
        borderWidth="5px"
        sx={{
          boxShadow: '13px 28px 0px 11px rgba(0,0,0,1)',
          WebkitBoxShadow: '13px 28px 0px 11px rgba(0,0,0,1)', // This is usually not necessary as Chakra UI uses emotion which handles vendor prefixing automatically.
          MozBoxShadow: '13px 28px 0px 11px rgba(0,0,0,1)', // Same as above, generally not needed.
        }}
      >
        <Flex direction="column" gap={10}>
          <Container>
            <VStack spacing={4}>
              <Text fontWeight="500" fontSize="3em" whiteSpace={"pre-wrap"} align="center">AnyConvert Currency Converter</Text>
              <Flex direction="row" m="auto" gap={3} pr={10}>
                <Text fontWeight={700}>Cryptocurrency</Text>
                <Switch size="lg" colorScheme='blue' sx={{ 'span.chakra-switch__track:not([data-checked])': { bg: 'blue.200' } }} onChange={(e) => setCurrencyType(e.target.checked ? "Currency" : "Cryptocurrency")} />
                <Text fontWeight={700}>Currency</Text>
              </Flex>

              <Input
                _placeholder={{ color: 'gray.500' }}
                type={"number"}
                placeholder="Amount"
                fontWeight={800}
                bg="white"
                borderColor="gray.300"
                value={Number(amount) || ""}
                onChange={(e) => {
                  setResult(null);
                  setAmount(Number(e.target.value));
                }}
                _hover={{ borderColor: "black" }}
              />
              <Select 
                ref={setFromCurrencySelectRef}
                instanceId = "from-currencies-box"
                name="from-currencies-box"
                styles={customStyles}
                components={{ Option: optimizeSelect.components.Option, MenuList: optimizeSelect.components.MenuList }}
                options={(fromCurrencies || []).map((currency) => ({
                  value: currency.currency_id,
                  label: currencyType === "Currency" ? currency.currency_symbol.toUpperCase() : `${currency.currency_symbol.toUpperCase()} - ${currency.currency_name.toUpperCase()}`,
                }))}
                filterOption={createFilter({ ignoreAccents: false })}
                isClearable={true}
                isMulti={false}
                onChange={(e) => setFromCurrency(e?.value)} 
              />
              <Text>To</Text>
              <Select 
                ref={setToCurrencySelectRef}
                instanceId = "to-currencies-box"
                name="to-currencies-box"
                styles={customStyles}
                components={{ Option: optimizeSelect.components.Option, MenuList: optimizeSelect.components.MenuList }}
                options={(toCurrencies || []).map((currency) => ({
                  value: currency.currency_id,
                  label: currencyType === "Currency" ? currency.currency_symbol.toUpperCase() : `${currency.currency_symbol.toUpperCase()} - ${currency.currency_name.toUpperCase()}`,
                }))}
                filterOption={createFilter({ ignoreAccents: false })}
                isClearable={true}
                isMulti={false}
                onChange={(e) => setToCurrency(e?.value)} 
              />
              <Button bg="blue.600" _hover={{ bg: "blue.700" }} color="white" onClick={() => currencyType === "Currency" ? getCurrencyRates() : getCryptocurrencyRates()} isDisabled={!amount || !fromCurrency || !toCurrency}>
                Convert
              </Button>
              {result !== null && (
                <Box>
                  <Input
                    _disabled={{ color: "black" }}
                    isDisabled={true}
                    placeholder="Amount"
                    value={`${amount} ${(fromCurrency || "").toUpperCase()} is ${Number(result || 0).toFixed(20).replace(/\.0+$/, "")} ${(toCurrency || "").toUpperCase()}`}
                    fontWeight={800}
                  />
                  <Flex rounded="20" mt={5} color="white" direction={"row"} p="5" bg="blue.400" gap={3}>
                    <IoInformationCircleOutline size="50"/>
                    <Text fontWeight={"700"}>The amount may differ when sending money through other platforms. Compare exchange rates <Link color="blue.800" href="https://wise.com/gb/compare/" isExternal>here.</Link></Text>
                  </Flex>
                  <Flex rounded="20" mt={5} color="white" direction={"row"} p="5" bg="blue.400" gap={3}>
                    <IoInformationCircleOutline size="50"/>
                    <Text fontWeight={"700"}>Get private + unlimited requests + real time currency converter access by <Link color="blue.800" onClick={() => navigate("/contact")}>contact us.</Link></Text>
                  </Flex>
                </Box>
              )}
            </VStack>
          </Container>
        </Flex>
      </Flex>
      <Footer/>
    </>
  );
}
