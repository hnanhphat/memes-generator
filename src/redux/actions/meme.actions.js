import * as types from "../constants/meme.constants";
import { toast } from "react-toastify";
import api from "../../apiService";
import { routeActions } from "./route.actions";

const memesRequest = (pageNum) => async (dispatch) => {
  dispatch({ type: types.GET_MEMES_REQUEST, payload: null });
  try {
    const res = await api.get(`/memes?page=${pageNum}&perPage=10`);
    dispatch({
      type: types.GET_MEMES_SUCCESS,
      payload: { memes: res.data.memes, totalPages: res.data.totalPages },
    });
  } catch (error) {
    dispatch({ type: types.GET_MEMES_FAILURE, payload: error });
  }
};

const singleMemeRequest = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_MEME_REQUEST, payload: null });
  try {
    const res = await api.get(`/memes/${id}`);
    dispatch({
      type: types.GET_SINGLE_MEME_SUCCESS,
      payload: res.data.meme,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_MEME_FAILURE, payload: error });
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

const deleteMemeRequest = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_MEME_REQUEST, payload: null });
  try {
    const res = await api.delete(`/memes/${id}`);
    dispatch({ type: types.DELETE_MEME_SUCCESS, payload: res });
    dispatch(routeActions.redirect("/gallery"));
  } catch (error) {
    dispatch({ type: types.DELETE_MEME_FAILURE, payload: error });
  }
};

export const memeActions = {
  memesRequest,
  singleMemeRequest,
  createMemeRequest,
  setSelectedMeme,
  updateMemeRequest,
  deleteMemeRequest,
};
