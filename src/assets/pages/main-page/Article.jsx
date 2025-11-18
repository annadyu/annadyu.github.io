const Article = ({
  author,
  date,
  likes,
  title,
  description,
  tags,
}) => {

  const dataToString = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); 
  return (
    <div className="blog">
      <div className="blog-heeader">
        <div className="blog-info">
          <div className="blog-author">{author}</div>
          <div className="blog-date">{dataToString}</div>
        </div>
        <div className="blog-likes">
          {likes}
        </div>
      </div>
      <h1 className="blog-name">{title}</h1>
      <p className="blog-desc">{description}</p>
      <ul className="blog-tags">
        <li className="blog-tag">{tags}</li>
      </ul>
    </div>
  );
};

export default Article;
