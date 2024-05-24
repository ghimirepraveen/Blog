const Card = ({ image, title, author, date }) => {
  return (
    <div className="card w-full bg-white rounded shadow-md overflow-hidden flex flex-col justify-between h-80">
      <img
        src={image || "https://via.placeholder.com/300"}
        alt="image"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-lg font-bold line-clamp-2">{title || "Title"}</h2>
        <div className="flex justify-between text-sm mt-2">
          <p>{author || "Author"}</p>
          <p>{date || "Date"}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
