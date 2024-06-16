import React, { useState } from "react";
import { SimpleGrid, Box, Select } from "@chakra-ui/react";
import BookCard from "./BookCard";

const BookList = ({ books, onDeleteBook, onUpdateBook }) => {
  const [groupBy, setGroupBy] = useState("year");

  const groupBooks = (books, criterion) => {
    return books.reduce((groups, book) => {
      const key = book[criterion] || "Unknown";
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(book);
      return groups;
    }, {});
  };

  const groupedBooks = groupBooks(books, groupBy);

  const sortedGroups = Object.keys(groupedBooks).sort((a, b) => {
    if (b === "Unknown") return -1;
    return a.localeCompare(b);
  });

  const groupLabels = {
    year: "Group by Year",
    rating: "Group by Rating",
    authors: "Group by Author",
  };

  const getGroupLabel = (group) => {
    if (groupBy === "year") {
      return group === "Unknown" ? "Unknown Year" : `Year ${group}`;
    } else if (groupBy === "rating") {
      return group === "Unknown" ? "Unknown Rating" : `Rating ${group}`;
    } else if (groupBy === "authors") {
      return group === "Unknown" ? "Unknown Author" : `Author ${group}`;
    } else {
      return group;
    }
  };

  return (
    <Box mx={{ base: 2, md: 12, lg: 16, xl: 24 }} mt={12}>
      <Box mb={6}>
        <Select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          width="200px"
        >
          {Object.keys(groupLabels).map((key) => (
            <option key={key} value={key}>
              {groupLabels[key]}
            </option>
          ))}
        </Select>
      </Box>
      {sortedGroups.map((group) => (
        <Box key={group} mb={10}>
          <Box mb={4} fontSize="xl" fontWeight="bold">
            {getGroupLabel(group)}
          </Box>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={5} alignItems="center">
            {groupedBooks[group]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  updateBook={onUpdateBook}
                  deleteBook={onDeleteBook}
                />
              ))}
          </SimpleGrid>
        </Box>
      ))}
    </Box>
  );
};

export default BookList;
