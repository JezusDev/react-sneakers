import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Drawer from "./components/Overlay/Drawer";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { AppContext } from "./context/Context";

function App() {
  const [drawer, setDrawer] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data: sneakersData } = await axios.get(
        "https://62fb5d21abd610251c06d760.mockapi.io/items"
      );
      const { data: cartData } = await axios.get(
        "https://62fb5d21abd610251c06d760.mockapi.io/cart"
      );
      const { data: favoritesData } = await axios.get(
        "https://62fb5d21abd610251c06d760.mockapi.io/favorites"
      );

      setCartItems(cartData);
      setFavorites(favoritesData);
      setSneakers(sneakersData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function toggleDrawer() {
    setDrawer(!drawer);
  }

  async function onAddToCart(obj) {
    try {
      if (cartItems.find((item) => item.id == obj.id)) {
        axios.delete(
          `https://62fb5d21abd610251c06d760.mockapi.io/cart/${obj.mockID}`
        );
        setCartItems((prev) => prev.filter((item) => item.id != obj.id));
      } else {
        const { data } = await axios.post(
          "https://62fb5d21abd610251c06d760.mockapi.io/cart",
          obj
        );

        setCartItems((prev) => {
          return [...prev, data];
        });
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  async function onAddToFavorites(obj) {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        axios.delete(
          `https://62fb5d21abd610251c06d760.mockapi.io/favorites/${obj.mockID}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://62fb5d21abd610251c06d760.mockapi.io/favorites",
          obj
        );

        setFavorites((prev) => {
          return [...prev, data];
        });
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function isItemAdded(id) {
    return cartItems.some((obj) => obj.id === id);
  }

  function isItemFavorited(id) {
    return favorites.some((obj) => obj.id === id);
  }

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorites,
        sneakers,
        isItemAdded,
        onAddToCart,
        onAddToFavorites,
        isItemFavorited,
      }}
    >
      <div className="wrapper clear">
        {drawer && (
          <Drawer
            onClickCart={toggleDrawer}
            cartItems={cartItems}
            onRemove={onAddToCart}
          />
        )}

        <Header onClickCart={toggleDrawer} cartItems={cartItems} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchInput={searchInput}
                handleSearchInput={handleSearchInput}
                setSearchInput={setSearchInput}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
