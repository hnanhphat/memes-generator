import React from "react";

const MemeList = ({ memes, showDetail }) => {
  return (
    <div id="memes-list" className="memes-list">
      {memes?.length > 0 ? (
        <ul>
          {memes.map((meme) => (
            <li key={meme.id} onClick={() => showDetail(meme)}>
              <img
                src={`${process.env.REACT_APP_BACKEND_API}/${
                  meme.outputMemePath.split("public/")[1]
                }?${meme.updatedAt}`}
                alt=""
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no memes</p>
      )}
    </div>
  );
};

export default MemeList;
