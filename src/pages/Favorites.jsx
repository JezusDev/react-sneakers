import React, { useContext } from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../context/Context";

function Favorites({ onAddToFavorites, onAddToCart }) {
  const { favorites: sneakers } = useContext(AppContext);
  const mock = (idx) => {
    if (sneakers.find((item) => item.id === idx)) {
      return sneakers.find((item) => item.id === idx).mockID;
    } else {
      return undefined;
    }
  };
  return (
    <>
      <div className="content p-40">
        <div className="content d-flex align-center justify-between mb-40">
          <h1 className="">Мои закладки</h1>
        </div>
        <div className="sneakers d-flex flex-wrap">
          {sneakers.map(({ name, price, src, id }) => (
            <Card
              name={name}
              price={price}
              src={src}
              id={id}
              mockID={mock(id)}
              key={id}
              favorited={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Favorites;
