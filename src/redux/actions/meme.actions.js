import * as types from "../constants/meme.constants";
import { toast } from "react-toastify";
import api from "../../apiService";

const memesRequest = (pageNum) => async (dispatch) => {
  dispatch({ type: types.GET_MEMES_REQUEST, payload: null });
  try {
    const res = await api.get(`/memes?page=${pageNum}&perPage=10`);
    // console.log(res);
    dispatch({
      type: types.GET_MEMES_SUCCESS,
      payload: { memes: res.data.memes, totalPages: res.data.totalPages },
    });
  } catch (error) {
    dispatch({ type: types.GET_MEMES_FAILURE, payload: error });
  }
};

const createMemeRequest = (image) => async (dispatch) => {
  dispatch({ type: types.CREATE_MEME_REQUEST, payload: null });
  try {
    const formData = new FormData();
    formData.append("image", image);
    const res = await api.post(`/memes`, formData);
    dispatch({
      type: types.CREATE_MEME_SUCCESS,
      payload: {
        meme: res.data,
        outputMemePath: res.data.outputMemePath,
        updatedAt: res.data.updatedAt,
      },
    });
    toast.success("You can put your idea on the meme now!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.CREATE_MEME_FAILURE, payload: error });
  }
};

const setSelectedMeme = (meme) => ({
  type: types.SET_SELECTED_MEME,
  payload: meme,
});

const updateMemeRequest = (texts, memeId) => async (dispatch) => {
  dispatch({ type: types.UPDATE_MEME_REQUEST, payload: null });
  try {
    const body = { texts };
    const res = await api.put(`/memes/${memeId}`, body);
    dispatch({
      type: types.UPDATE_MEME_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_MEME_FAILURE, payload: error });
  }
};

export const memeActions = {
  memesRequest,
  createMemeRequest,
  setSelectedMeme,
  updateMemeRequest,
};
