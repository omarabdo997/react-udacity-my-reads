import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
    
    render() {
        const {book, changeShelf} = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <div 
                        className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage: book.imageLinks && `url(${book.imageLinks.thumbnail})` }}
                    ></div>
                    <BookShelfChanger book={book} changeShelf={changeShelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && book.authors.map((author, index) => (
                    <div className="book-authors" key={index}>{author}</div>
                ))}
            </div>
        )
    }
}
export default Book;