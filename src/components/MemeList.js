import React from "react";
import { Link } from "react-router-dom";

const MemeList = ({ memes, showDetail }) => {
  return (
    <div id="memes-list" className="memes-list">
      <div className="container">
        {memes?.length > 0 ? (
          <ul>
            {memes.map((meme) => (
              <li key={meme.id} onClick={() => showDetail(meme)}>
                <Link to={`/gallery/${meme.id}`}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_API}/${
                      meme.outputMemePath.split("public/")[1]
                    }?${meme.updatedAt}`}
                    alt=""
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-item">
            There are no memes
            <Link to="/">Create new meme!</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default MemeList;
