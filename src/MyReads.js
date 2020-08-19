import React, {Component} from 'react'
import Shelf from './Shelf'
import {Link} from 'react-router-dom'

class MyReads extends Component {
    render() {
        const {shelfBooks, changeShelf} = this.props;
        const books = {
            currentlyReading: [],
            wantToRead: [],
            read: []
        }
        shelfBooks.forEach((book) => {
            books[book.shelf].push(book);
        }) 
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Shelf title={'Currently Reading'} books={books.currentlyReading} changeShelf={changeShelf}/>
                    <Shelf title={'Want to Read'} books={books.wantToRead} changeShelf={changeShelf}/>
                    <Shelf title={'Read'} books={books.read} changeShelf={changeShelf}/>
                </div>
                <div className="open-search">
                    <Link className='fancy-link' to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}
export default MyReads;