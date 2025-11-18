import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="notfound">
            <h1 className="notfound-title">Page not found!!</h1>
            <p className="notfound-link">return to the <Link to="/">
            Homepage
            </Link>.</p>
        </div>
    )
}

export default NotFound;