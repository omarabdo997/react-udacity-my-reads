import React, {Component} from 'react'
import SearchBar from './SearchBar'
import {search} from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
    state = {
        searchedBooks: [],
        query:'',
    }

    addShelf= (searchedBooks) => {     
        if (searchedBooks.error) return;
        for (let book of searchedBooks) {
            for (const shelfBook of this.props.shelfBooks) {
                if ( book.id === shelfBook.id ) book.shelf = shelfBook.shelf;
            }
            if (!book.shelf) book.shelf = 'none';
        }
    }
    changeQuery = (query) => {
        this.setState(() => ({
            query
        }))
    }
    searchBooks = (query) => {
        if (query==='') {
            this.setState(()=>({
                searchedBooks: [],
            }))
        } else {  
            search(query)
            .then((searchedBooks) => {
                if (query === this.state.query) {
                    this.setState(()=>{
                        this.addShelf(searchedBooks);
                        return {searchedBooks};
                    })
                }      
            })

            
                      
        }  
    }
    
    render() {
        let {changeShelf}= this.props
        return (
            <div className="search-books">
                <SearchBar searchBooks={this.searchBooks} query={this.state.query} changeQuery={this.changeQuery}/>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {!this.state.searchedBooks.error && this.state.searchedBooks.map((book)=>(
                            <li key={book.id}><Book book={book} changeShelf={changeShelf}/></li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}
export default SearchBooks;