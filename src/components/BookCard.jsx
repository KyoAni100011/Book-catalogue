import {
  Box,
  Heading,
  Text,
  Image,
  IconButton,
  useColorModeValue,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Select,
  FormHelperText,
  useToast,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaTrash, FaStar } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

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

export default function BookCard({ book, deleteBook, updateBook }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("blue.600", "blue.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const textMutedColor = useColorModeValue("gray.600", "gray.400");
  const starColor = "yellow.400";
  const boxShadow = useColorModeValue("lg", "dark-lg");
  const toast = useToast();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: book.name,
    authors: book.authors,
    year: book.year,
    rating: book.rating,
    isbn: book.isbn,
  });

  const [isbnError, setIsbnError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "isbn") {
      setIsbnError(validateISBN(value) ? "" : "Invalid ISBN");
    }
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

  const validateISBN = (isbn) => {
    const cleanedISBN = isbn.replace(/-/g, "");
    return (
      (cleanedISBN.length === 10 || cleanedISBN.length === 13) &&
      /^\d+$/.test(cleanedISBN)
    );
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

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    if (!isbnError) {
      try {
        await updateBook(book.id, formData);
        onEditClose();
        showToast(
          "Book Updated",
          "The book has been updated successfully.",
          "success"
        );
      } catch (error) {
        showToast(
          "Error",
          "Failed to update the book. Please try again later.",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(currentYear - 1799),
    (val, index) => 1800 + index
  );

  return (
    <Box
      boxShadow={boxShadow}
      borderRadius="md"
      overflow="hidden"
      border="1px"
      borderColor={borderColor}
      maxW="sm"
      bg={cardBg}
      p={4}
      position="relative"
      _hover={{ boxShadow: "xl" }}
    >
      {/* Delete Modal */}
      <IconButton
        icon={<FaTrash />}
        aria-label="Delete book"
        position="absolute"
        top={2}
        right={2}
        size="sm"
        colorScheme="red"
        zIndex={2}
        onClick={onDeleteOpen}
      />
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box mb={4} textAlign="center" fontSize="xl">
              <Icon
                as={FaExclamationTriangle}
                boxSize={10}
                color="red.500"
                mb={4}
              />
              <Text fontWeight={700} mb={4}>
                Delete Project
              </Text>
              <Text mb={4} fontSize={"sm"}>
                You're going to delete the "{book.name}" project. Are you sure?
              </Text>
            </Box>
            <Flex gap={2}>
              <Button onClick={onDeleteClose} colorScheme="gray" flexGrow={1}>
                No, Keep It.
              </Button>
              <Button
                onClick={() => deleteBook(book.id)}
                colorScheme="red"
                flexGrow={1}
              >
                Yes, Delete!
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <IconButton
        icon={<MdEdit />}
        aria-label="Edit book"
        position="absolute"
        bottom={2}
        right={2}
        size="sm"
        colorScheme="blue"
        zIndex={2}
        onClick={onEditOpen}
      />
      <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={2}>
              <FormControl>
                <FormLabel>Book Title</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormHelperText>
                  Enter the title of the book (max 100 characters).
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>List of Authors</FormLabel>
                <Textarea
                  name="authors"
                  value={formData.authors}
                  onChange={handleChange}
                />
                <FormHelperText>Enter the authors of the book.</FormHelperText>
              </FormControl>
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
              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Input
                  name="rating"
                  value={formData.rating}
                  isInvalid={!validateRating(formData.rating)}
                  onChange={handleChange}
                />
                <FormHelperText>
                  Enter a rating between 0 and 10.
                </FormHelperText>
              </FormControl>
              <FormControl isInvalid={isbnError}>
                <FormLabel>ISBN</FormLabel>
                <Input
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                />
                {isbnError && (
                  <Text color="red.500" fontSize="sm">
                    {isbnError}
                  </Text>
                )}
                <FormHelperText>
                  Enter the ISBN number (10 or 13 digits).
                </FormHelperText>
              </FormControl>
            </Flex>
            <Flex gap={2} mt={4}>
              <Button onClick={onEditClose} colorScheme="gray" flexGrow={1}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                colorScheme="blue"
                flexGrow={1}
                isLoading={isLoading}
              >
                Save
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Book details */}
      <Box position="relative">
        <Box
          position="absolute"
          top={2}
          left={2}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          border={1}
          borderColor={"gray.600"}
          p={1}
          display="flex"
          alignItems="center"
          backgroundColor={cardBg}
        >
          <Text mr={1} fontSize="sm" fontWeight={700}>
            {book.rating}
          </Text>
          <Icon as={FaStar} color={starColor} />
        </Box>
        <Image
          src="../assets/imgs/300.png"
          alt={book.title}
          objectFit="cover"
          borderRadius="md"
          w="100%"
          h="auto"
          mb={4}
        />
        <Heading as="h3" size="sm" mb={2} color={headingColor} fontSize="sm">
          {book.name}
        </Heading>
        <Text color={textColor} mb={2} fontWeight="bold" fontSize="xs">
          by {book.authors}
        </Text>
        <Text color={textMutedColor} mb={2} fontSize="xs">
          Pub. Year: {book.year}
        </Text>
        <Text color={textMutedColor} fontSize="xs">
          ISBN: {book.isbn}
        </Text>
      </Box>
    </Box>
  );
}
