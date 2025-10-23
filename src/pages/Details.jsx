import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Details = () => {
  const { id } = useParams();
  const [toy, setToy] = useState(null);

  useEffect(() => {
    fetch("/toyCollection.json")
      .then((res) => res.json())
      .then((data) => {
        const foundToy = data.find((item) => item.id === parseInt(id));
        setToy(foundToy);
      })
      .catch((error) => console.error("Error loading details:", error));
  }, [id]);

  if (!toy) {
    return <div className="text-center text-gray-600 mt-10">Loading details...</div>;
  }

  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <img src={toy.image} alt={toy.name} className="w-full h-80 object-cover rounded-xl" />

      <h2 className="text-3xl font-bold mt-4 mb-2 text-gray-800">{toy.name}</h2>
      <div className="flex items-center gap-2 mb-2">
        {renderStars(toy.rating)}
        <span className="text-gray-600 text-sm">({toy.rating})</span>
      </div>

      <p className="text-lg text-gray-700 mb-3"> Price: <strong>${toy.price}</strong></p>

      <p className="text-gray-600 leading-relaxed">{toy.description}</p>

      <div className="mt-6">
        <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
         Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Details;
