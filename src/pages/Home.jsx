import React, { useContext } from "react";
import Card from "../components/Card/Card";
import MyLoader from "../components/MyLoader/MyLoader";
import { AppContext } from "../context/Context";

function Home({ searchInput, handleSearchInput, setSearchInput, isLoading }) {
  const { sneakers, cartItems } = useContext(AppContext);
  const renderItem = () => {
    const loadCards = [];
    const mock = (idx) => {
      if (cartItems.find((item) => item.id === idx)) {
        return cartItems.find((item) => item.id === idx).mockID;
      } else {
        return undefined;
      }
    };

    if (isLoading) {
      for (let i = 0; i < 10; i++) {
        loadCards.push(<MyLoader key={i} />);
      }
      return loadCards;
    }

    return sneakers
      .filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      .map(({ name, price, src, id }) => (
        <Card
          name={name}
          price={price}
          src={src}
          id={id}
          mockID={mock(id)}
          key={id}
        />
      ));
  };

  return (
    <>
      <div className="content p-40">
        <div className="content d-flex align-center justify-between mb-40">
          <h1 className="">
            {searchInput ? `Поиск по запросу: ${searchInput}` : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex align-center">
            <img src="/images/Search.svg" alt="search" />
            <input
              type="text"
              value={searchInput}
              placeholder="Поиск..."
              onChange={handleSearchInput}
            />
            {searchInput && (
              <img
                width={20}
                height={20}
                className="remove-btn cu-p"
                src="/images/Delete.svg"
                alt="remove"
                onClick={() => setSearchInput("")}
              />
            )}
          </div>
        </div>
        <div className="sneakers d-flex flex-wrap">{renderItem()}</div>
      </div>
    </>
  );
}

export default Home;
