import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  function cartPrice() {
    const list = props.cartItems;
    if (list.length) {
      return list.reduce((acc, item) => acc + +item.price, 0);
    } else {
      return false;
    }
  }

  return (
    <header className="header d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="header-left d-flex align-center">
          <img
            className="mr-15"
            width={40}
            height={40}
            src="/images/logo.svg"
            alt=""
          />
          <div className="header-info">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="header-right d-flex align-center">
        <li className=" cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src="/images/Basket.svg" alt="" />
          {cartPrice() && <span className="ml-10">{cartPrice()} руб.</span>}
        </li>
        <li>
          <Link to="/favorites">
            <img width={18} height={18} src="/images/Favorites.svg" alt="" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/images/Person.svg" alt="" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
