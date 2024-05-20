const Card = ({ image, title, author, date }) => {
  return (
    <div className="card w-full max-w-xs bg-white rounded shadow-md overflow-hidden m-2">
      <img
        src={image || "https://via.placeholder.com/300"}
        alt="image"
        className="w-full h-72 object-cover"
      />
      <div className="p-2">
        <h2 className="text-lg font-bold">{title || "Title"}</h2>
        <div className="flex justify-between text-sm mt-1">
          <p>{author || "Author"}</p>
          <p>{date || "Date"}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
