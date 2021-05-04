import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { memeActions } from "../redux/actions/meme.actions";
import { routeActions } from "../redux/actions/route.actions";
import Loading from "../components/Loading";

const SinglePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const meme = useSelector((state) => state.meme.singleMeme);
  const loading = useSelector((state) => state.meme.loading);
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const handleDelete = () => {
    dispatch(memeActions.deleteMemeRequest(id));
  };

  useEffect(() => {
    dispatch(memeActions.singleMemeRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <div id="single" className="single">
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <img
            src={`${process.env.REACT_APP_BACKEND_API}/${
              meme.outputMemePath && meme.outputMemePath.split("public/")[1]
            }?${meme.updatedAt}`}
            alt=""
          />
          <div className="btns">
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/edit/${meme && meme.id}`}>Edit</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
