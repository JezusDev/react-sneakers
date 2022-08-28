import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    className="loader"
    speed={2}
    width={210}
    height={260}
    viewBox="0 0 220 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="30" y="35" rx="10" ry="10" width="150" height="90" />
    <rect x="30" y="140" rx="3" ry="3" width="150" height="15" />
    <rect x="30" y="200" rx="8" ry="8" width="80" height="24" />
    <rect x="150" y="200" rx="8" ry="8" width="32" height="32" />
    <rect x="30" y="160" rx="3" ry="3" width="93" height="15" />
  </ContentLoader>
);

export default MyLoader;
