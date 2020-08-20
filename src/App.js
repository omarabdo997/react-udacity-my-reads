import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReads from './MyReads'
import SearchBooks from './SearchBooks'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelfBooks: []
 
  }

  retrieveAndUpdate= () => {
    BooksAPI.getAll()
      .then((shelfBooks) => {
        this.setState(()=>({
          shelfBooks
        }))
      })
  }

  // changeShelf = (book, shelf) => {
  //   BooksAPI.update(book, shelf)
  //     .then(() => {
  //       this.retrieveAndUpdate()
  //     })
  // }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(currentState => {
          let bookExists = false;
          let index=0;
          book.shelf=shelf;
          for (let shelfBook of currentState.shelfBooks) {
            if (book.id === shelfBook.id) {
              shelfBook.shelf = shelf;
              if (shelf === 'none') currentState.shelfBooks.splice(index, 1);
              bookExists = true;
              break;
            }
            index++;
          }
          if (bookExists) return {shelfBooks:currentState.shelfBooks};
          else return {shelfBooks: [...currentState.shelfBooks, book]} 
        })
      })
  }  
     
  componentDidMount() {
    this.retrieveAndUpdate();
  }

  

  render() {
    return (
      <div className="app">
        <Route path='/search'> 
          <SearchBooks changeShelf={this.changeShelf} shelfBooks={this.state.shelfBooks}/>
        </Route>
        <Route exact path='/'>
          <MyReads shelfBooks={this.state.shelfBooks} changeShelf={this.changeShelf}/>
        </Route>
      </div>
    )
  }       
}


export default BooksApp
