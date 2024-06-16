import React from "react";
import { Box, Text, Heading, useColorMode } from "@chakra-ui/react";

const BookRecommendation = ({ books }) => {
  const { colorMode } = useColorMode();

  const bgColor = colorMode === "dark" ? "gray.800" : "white";
  const textColor = colorMode === "dark" ? "white" : "gray.800";
  const borderColor = colorMode === "dark" ? "gray.600" : "gray.200";

  const findTopRatedBook = (filteredBooks) => {
    if (filteredBooks.length === 0) return null;
    const highestRating = Math.max(...filteredBooks.map((book) => book.rating));
    return filteredBooks.filter((book) => book.rating == highestRating);
  };

  const currentYear = new Date().getFullYear();
  const filteredBooks = books.filter((book) => currentYear - book.year <= 3);

  const topRatedBooks = findTopRatedBook(filteredBooks);

  const recommendedBook =
    topRatedBooks && topRatedBooks.length > 0
      ? topRatedBooks[Math.floor(Math.random() * topRatedBooks.length)]
      : null;

  return (
    <Box
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg={bgColor}
      color={textColor}
    >
      <Heading as="h1" size="xl" mb="4" textAlign="center">
        Recommended Book
      </Heading>

      {recommendedBook ? (
        <Box
          p="4"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="base"
          bg={colorMode === "dark" ? "gray.700" : "gray.100"}
          borderColor={borderColor}
        >
          <Text fontSize="xl" mb="2">
            <strong>Title:</strong> {recommendedBook.name}
          </Text>
          <Text fontSize="xl" mb="2">
            <strong>Rating:</strong> {recommendedBook.rating}
          </Text>
          <Text fontSize="xl">
            <strong>Publication Year:</strong> {recommendedBook.year}
          </Text>
        </Box>
      ) : (
        <Box
          p="6"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg={bgColor}
          color={textColor}
        >
          <Heading as="h2" size="md" textAlign="center">
            No books available that meet the criteria.
          </Heading>
        </Box>
      )}
    </Box>
  );
};

export default BookRecommendation;
