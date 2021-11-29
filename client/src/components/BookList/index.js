import React from 'react'
import Fetch from '../../Fetch'
import Book from '../Book'

const BookList = () => {
  return (
    <div>
      <Fetch uri={"http://localhost:9000/booksAPI"} renderSuccess={BookListTemplate} />
    </div>
  )
}

function BookListTemplate ({data}) {
  const booksArray = data.books
  console.log(booksArray)
  console.log(booksArray[0])
  return (
    booksArray.map((bookData) =>  
      <Book 
        key={bookData.isbn} 
        title={bookData.title}
      />
    )
  )
}

export default BookList