import React, { useState, useContext } from "react";
import { AppContext } from "../../context/Context";
import MyLoader from "../MyLoader/MyLoader";
import styles from "./Card.module.scss";

function Card({ src, price, name, id, mockID, loading = false }) {
  const {
    onAddToCart: onPlus,
    onAddToFavorites: onFavorite,
    isItemAdded,
    isItemFavorited,
  } = useContext(AppContext);

  function handlePlusClick(e) {
    e.preventDefault();
    onPlus({ src, price, name, id, mockID });
  }

  function handleFavorites() {
    onFavorite({ src, price, name, id, mockID });
  }

  return (
    <>
      {loading ? (
        <div>
          <MyLoader />
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.favorite} onClick={handleFavorites}>
            <img
              src={
                isItemFavorited(id)
                  ? "/images/ActiveLike.svg"
                  : "/images/Like.svg"
              }
              alt="like"
            />
          </div>
          <img width={133} height={112} src={src} alt="Sneaker" />
          <h5>{name}</h5>
          <div className="cardBottom d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена: </span>
              <b>{price} руб.</b>
            </div>

            <button className={styles.button} onClick={handlePlusClick}>
              <img
                src={isItemAdded(id) ? "/images/BtnOk.svg" : "/images/Plus.svg"}
                alt="cart"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
