import React, { useState } from "react";
import Info from "../Info/Info";
import axios from "axios";

function Drawer(props) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  function computedPrice() {
    return props.cartItems.reduce((acc, item) => {
      return Math.round(acc + +item.price);
    }, 0);
  }

  async function onClickOrder() {
    try {
      const { data } = await axios.post(
        "https://62fb5d21abd610251c06d760.mockapi.io/orders",
        props.cartItems
      );

      setIsOrderComplete((prev) => !prev);
      setOrderId(data.mockID);
      props.setCartItems([]);

      for (let index = 0; index < props.cartItems.length; index++) {
        await axios.delete(
          `https://62fb5d21abd610251c06d760.mockapi.io/cart/${props.cartItems[index].mockID}`
        );
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <div className="drawer-header d-flex justify-between align-center mb-30">
          <h2 className="">Корзина</h2>
          <div className="cu-p" onClick={props.onClickCart}>
            <img className="remove-btn" src="/images/Delete.svg" alt="remove" />
          </div>
        </div>

        {props.cartItems.length ? (
          <>
            <div className="items mb-40 flex">
              {props.cartItems.map(({ src, price, name, id, mockID }) => {
                return (
                  <div className="cart-item d-flex align-center mb-20" key={id}>
                    <img
                      className="cart-item__img mr-20"
                      width={70}
                      height={70}
                      src={src}
                      alt=""
                    />
                    <div className="mr-20 flex">
                      <p className="mb-5">{name}</p>
                      <b>{price} руб.</b>
                    </div>
                    <div>
                      <img
                        className="remove-btn"
                        src="/images/Delete.svg"
                        alt="remove"
                        onClick={() =>
                          props.onRemove({ src, price, name, id, mockID })
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="total-block">
              <ul className="mb-40">
                <li className="d-flex justify-between">
                  <span>Итого</span>
                  <div></div>
                  <b>{computedPrice()} руб.</b>
                </li>
                <li className="d-flex justify-between">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{Math.round(computedPrice() * 0.05)} руб.</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenBtn">
                Оформить заказ
                <img src="/images/Arrow.svg" alt="" />
              </button>
            </div>
          </>
        ) : isOrderComplete ? (
          <Info
            title="Заказ оформлен!"
            text={`Ваш заказ #${orderId} скоро будет передан курьерской доставке`}
            src="/images/cart-empty2.png"
            onClickCart={props.onClickCart}
          />
        ) : (
          <Info
            title="Корзина пустая"
            text="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            src="/images/cart-empty.png"
            onClickCart={props.onClickCart}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
