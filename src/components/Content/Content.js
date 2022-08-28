import React from "react";
import Card from "../Card/Card";

function Content(props) {
  return (
    <div className="content p-40">
      <div className="content d-flex align-center justify-between mb-40">
        <h1 className="">Все кроссовки</h1>
        <div className="search-block d-flex align-center">
          <img src="/images/Search.svg" alt="search" />
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>
      <div className="sneakers d-flex flex-wrap">
        <Card />
      </div>
    </div>
  );
}

export default Content;
