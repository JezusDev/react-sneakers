import React from "react";

function Drawer(props) {
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
                  <b>21 498 руб.</b>
                </li>
                <li className="d-flex justify-between">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button className="greenBtn">
                Оформить заказ
                <img src="/images/Arrow.svg" alt="" />
              </button>
            </div>
          </>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              src="/images/cart-empty.png"
              alt=""
              className="mb-20"
              width="120px"
              height="120px"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </p>
            <button className="greenBtn" onClick={props.onClickCart}>
              Вернуться назад
              <img src="/images/Arrow.svg" alt="" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
