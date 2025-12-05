import { Link } from "react-router-dom";

const Article = ({
  author,
  date,
  likes,
  title,
  description,
  tags,
  handleLike,
  slug,
}) => {
  const dataToString = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onClickLike = (event) => {
    event.stopPropagation();
    handleLike(slug);
  };

  return (
    <div className="blog">
      <Link to={`/articles/${slug}`}>
        <div className="blog-heeader">
          <div className="blog-info">
            <div className="blog-author">{author}</div>
            <div className="blog-date">{dataToString}</div>
          </div>
        </div>
        <h1 className="blog-name">{title}</h1>
        <p className="blog-desc">{description}</p>
        <ul className="blog-tags">
          <li className="blog-tag">{tags}</li>
        </ul>
      </Link>
      <button onClick={onClickLike} className="blog-likes">
        {likes}
      </button>
    </div>
  );
};

export default Article;
