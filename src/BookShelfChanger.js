import React, {Component} from 'react'

class BookShelfChanger extends Component {
    state = {
        shelf: this.props.book.shelf
    }
    hadleShelfChange = (event) => {
        const shelf = event.target.value;
        this.setState(()=>({
            shelf
        }))
        this.props.changeShelf(this.props.book,shelf)
    }
    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.shelf} onChange={this.hadleShelfChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}
export default BookShelfChanger;