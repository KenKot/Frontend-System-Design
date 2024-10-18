// query ExampleQuery {
//     authors {
//       id
//       name
//       books {
//         title
//       }
//     }
//     books {
//       id
//       title
//       author {
//         name
//       }
//     }
//   }

const data = {
  authors: [
    { id: "1", name: "Author 1", bookIds: ["101", "102"] },
    { id: "2", name: "Author 2", bookIds: ["103"] },
  ],
  books: [
    { id: "101", title: "Book 1", publishedYear: 2000, authorId: "1" },
    { id: "102", title: "Book 2", publishedYear: 2010, authorId: "1" },
    { id: "103", title: "Book 3", publishedYear: 2020, authorId: "1" },
  ],
};

export const resolvers = {
  Mutation: {
    addBook: (parent, args, context, info) => {
      console.log(args);
      const newBook = { ...args, id: data.books.length + 1 };
      data.books.push(newBook);
      return newBook;
    },
  },
  Book: {
    author: (parent, args, context, info) => {
      console.log(parent); // "parent" contains the current book object

      return data.authors.find(
        (authorDetail) => authorDetail.id === parent.authorId
      );
    },
  },

  Author: {
    books: (parent, args, context, info) => {
      return data.books.filter((bookDetail) =>
        parent.bookIds.includes(bookDetail.id)
      );
    },
  },

  Query: {
    authors: (parent, args, context, info) => {
      return data.authors;
    },
    books: (parent, args, context, info) => {
      return data.books;
    },
  },
};
