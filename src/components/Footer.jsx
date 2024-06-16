import {
  Box,
  Flex,
  Link,
  Text,
  IconButton,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.800"} py={8}>
      <Flex direction="column" alignItems="center">
        <Stack direction="row" spacing={4} mb={4}>
          <IconButton
            as={Link}
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
            fontSize="20px"
            _hover={{ color: colorMode === "light" ? "blue.400" : "blue.200" }}
          />
          <IconButton
            as={Link}
            href="#"
            aria-label="Facebook"
            icon={<FaFacebook />}
            variant="ghost"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
            fontSize="20px"
            _hover={{ color: colorMode === "light" ? "blue.600" : "blue.300" }}
          />
          <IconButton
            as={Link}
            href="#"
            aria-label="Instagram"
            icon={<FaInstagram />}
            variant="ghost"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
            fontSize="20px"
            _hover={{ color: colorMode === "light" ? "pink.400" : "pink.200" }}
          />
        </Stack>
        <Text
          fontSize="sm"
          color={colorMode === "light" ? "gray.600" : "gray.300"}
        >
          &copy; 2024 Your Company. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
