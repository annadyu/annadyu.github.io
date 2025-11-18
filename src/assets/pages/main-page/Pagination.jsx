import Articles from "./Articles";

const Pagination = ( {articlesPerPage, totalArticles, currentPage, setCurrentPage} ) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumber.push(i);
    
  }
  
  return (
    <div>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li className="page-item" key={number}>
            <button className="page-link" onClick={() => setCurrentPage(number)}>
                {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
 export default Pagination;