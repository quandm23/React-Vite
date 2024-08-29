import { useState } from "react";
import BookTable from "../components/books/BookTable";
import CreateBook from "../components/books/CreateTable";

const BookPage = () => {
    const [render,setRender] = useState(false);
    
    return (
        <div>
            <CreateBook  setRender={setRender} render={render}/>
            <BookTable render={render} setRender={setRender} />
        </div>
    )
}

export default BookPage;