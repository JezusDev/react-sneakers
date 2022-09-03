import React from "react";

const Info = ({ src, title, text, ...props }) => {
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img src={src} alt="" className="mb-20" height="120px" />
      <h2>{title}</h2>
      <p className="opacity-6">{text}</p>
      <button className="greenBtn" onClick={props.onClickCart}>
        Вернуться назад
        <img src="/images/Arrow.svg" alt="" />
      </button>
    </div>
  );
};

export default Info;
