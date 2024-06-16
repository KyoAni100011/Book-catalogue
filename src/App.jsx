import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import BookList from "./components/BookList";
import Header from "./components/Header";
import { Box } from "@chakra-ui/react";
import BookRecommendation from "./components/BookRecommendation";
import Footer from "./components/Footer";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "books"), (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addBook = async (book) => {
    try {
      await addDoc(collection(db, "books"), book);
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      await updateDoc(doc(db, "books", id), updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { id, ...updatedBook } : book
        )
      );
    } catch (error) {
      console.error("Error updating book: ", error);
    }
  };

  if (loading) {
    return (
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        width={"100wh"}
      >
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          translateX={"-50%"}
          translateY={"-50%"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width={30}
            height={30}
            style={{
              shapeRendering: "auto",
              display: "block",
              background: "rgb(255, 255, 255)",
            }}
          >
            <g>
              <g transform="translate(80,50)">
                <g transform="rotate(0)">
                  <circle fillOpacity={1} fill="#0033a1" r={6} cy={0} cx={0}>
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.875s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.875s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(71.21320343559643,71.21320343559643)">
                <g transform="rotate(45)">
                  <circle
                    fillOpacity="0.875"
                    fill="#0033a1"
                    r={6}
                    cy={0}
                    cx={0}
                  >
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.75s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.75s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(50,80)">
                <g transform="rotate(90)">
                  <circle fillOpacity="0.75" fill="#0033a1" r={6} cy={0} cx={0}>
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.625s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.625s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(28.786796564403577,71.21320343559643)">
                <g transform="rotate(135)">
                  <circle
                    fillOpacity="0.625"
                    fill="#0033a1"
                    r={6}
                    cy={0}
                    cx={0}
                  >
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.5s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.5s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(20,50.00000000000001)">
                <g transform="rotate(180)">
                  <circle fillOpacity="0.5" fill="#0033a1" r={6} cy={0} cx={0}>
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.375s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.375s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(28.78679656440357,28.786796564403577)">
                <g transform="rotate(225)">
                  <circle
                    fillOpacity="0.375"
                    fill="#0033a1"
                    r={6}
                    cy={0}
                    cx={0}
                  >
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.25s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.25s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(49.99999999999999,20)">
                <g transform="rotate(270)">
                  <circle fillOpacity="0.25" fill="#0033a1" r={6} cy={0} cx={0}>
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.125s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.125s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(71.21320343559643,28.78679656440357)">
                <g transform="rotate(315)">
                  <circle
                    fillOpacity="0.125"
                    fill="#0033a1"
                    r={6}
                    cy={0}
                    cx={0}
                  >
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="0s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="0s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g />
            </g>
          </svg>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Header onAddBook={addBook} />
      <BookRecommendation books={books} />
      <BookList
        books={books}
        onDeleteBook={deleteBook}
        onUpdateBook={updateBook}
      />
      <Footer />
    </Box>
  );
}

export default App;
