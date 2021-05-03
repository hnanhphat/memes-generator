import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeActions } from "../redux/actions/meme.actions";
import MemeList from "../components/MemeList";
import PaginationBar from "../components/PaginationBar";
import Loading from "../components/Loading";

const GalleryPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const memes = useSelector((state) => state.meme.memes);
  const totalPageNum = useSelector((state) => state.meme.totalPageNum);
  const loading = useSelector((state) => state.meme.loading);
  console.log(memes);

  const showDetail = () => {};

  useEffect(() => {
    dispatch(memeActions.memesRequest(pageNum));
  }, [dispatch, pageNum]);

  return (
    <div id="gallery" className="gallery">
      <h1>This is Gallery Page</h1>
      {loading ? (
        <Loading />
      ) : (
        <MemeList memes={memes} showDetail={showDetail} />
      )}
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
        loading={loading}
      />
    </div>
  );
};

export default GalleryPage;
