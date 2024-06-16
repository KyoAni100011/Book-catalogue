import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  FormHelperText,
  Icon,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SmallAddIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { TbSquareRoundedLetterBFilled } from "react-icons/tb";

const YearSelect = ({ value, onChange, years }) => (
  <Select
    name="year"
    value={value}
    onChange={onChange}
    placeholder="Select year"
  >
    {years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </Select>
);

const CustomFormControl = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  helperText,
  isTextArea = false,
  isRequired = false,
  maxLength,
  isInvalid = false,
}) => (
  <FormControl isRequired={isRequired} mb={4} isInvalid={isInvalid}>
    <FormLabel>{label}</FormLabel>
    {isTextArea ? (
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    ) : (
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    )}
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);

const AddBookModal = ({
  isOpen,
  onClose,
  years,
  formData,
  handleChange,
  handleSubmit,
  validateRating,
  isLoading,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }}>
    <ModalOverlay />
    <ModalContent pb={4}>
      <ModalHeader>Add New Book</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box mb={3}>
          <CustomFormControl
            label="Book Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Book name"
            helperText="Required, no longer than 100 characters"
            isRequired
            maxLength={100}
          />
          <CustomFormControl
            label="List of Authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="List of authors (separate by comma)"
            helperText="Required, book should have at least one author"
            isRequired
            isTextArea
          />
          <FormControl>
            <FormLabel>Publication Year</FormLabel>
            <YearSelect
              value={formData.year}
              onChange={handleChange}
              years={years}
            />
            <FormHelperText>
              Select the publication year of the book.
            </FormHelperText>
          </FormControl>
          <CustomFormControl
            label="Rating (0-10)"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter rating (0-10)"
            helperText="Optional, integer value from 0 to 10, 0 by default"
            isInvalid={formData.rating && !validateRating(formData.rating)}
          />
          <CustomFormControl
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
            helperText="Optional"
          />
        </Box>
        <Box textAlign="right">
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </Box>
      </ModalBody>
    </ModalContent>
  </Modal>
);

const Header = ({ onAddBook }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    authors: "",
    year: "",
    rating: "",
    isbn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showToast = (title, description, status = "error") => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const validateRating = (value) => {
    const intValue = parseInt(value);
    return !isNaN(intValue) && intValue >= 0 && intValue <= 10;
  };

  const validateForm = () => {
    const { name, authors, year, rating } = formData;
    if (!name) {
      showToast("Validation Error", "Book name is required.");
      return false;
    }
    if (name.length > 100) {
      showToast(
        "Validation Error",
        "Book name must be no longer than 100 characters."
      );
      return false;
    }
    if (!authors) {
      showToast("Validation Error", "List of authors is required.");
      return false;
    }
    if (year && year <= 1800) {
      showToast(
        "Validation Error",
        "Publication year must be greater than 1800."
      );
      return false;
    }
    if (rating && (!validateRating(rating) || rating < 0 || rating > 10)) {
      showToast(
        "Validation Error",
        "Rating must be an integer value from 0 to 10."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onAddBook(formData);
      setIsLoading(false);
      onClose();
      setFormData({
        name: "",
        authors: "",
        year: "",
        rating: "",
        isbn: "",
      });
      showToast(
        "Book Added",
        "The book has been added successfully.",
        "success"
      );
    }, 1000);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(currentYear - 1799),
    (val, index) => 1800 + index
  );

  return (
    <Box>
      <Flex justifyContent="space-between" py={3} px={{ base: 2, md: 24 }}>
        <Flex>
          <Flex alignItems="center" mr={3}>
            <Icon as={TbSquareRoundedLetterBFilled} boxSize={10} />
          </Flex>
          <Box
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            cursor="pointer"
            textAlign="center"
          >
            <Text textTransform="uppercase" fontWeight={700}>
              book catalogue
            </Text>
          </Box>
        </Flex>

        <Flex gap={4}>
          <Button onClick={toggleColorMode} background="none" px={2}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button
            colorScheme="blue"
            leftIcon={<SmallAddIcon fontSize="xl" />}
            onClick={onOpen}
          >
            Add Book
          </Button>
          <AddBookModal
            isOpen={isOpen}
            onClose={onClose}
            years={years}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            validateRating={validateRating}
            isLoading={isLoading}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
