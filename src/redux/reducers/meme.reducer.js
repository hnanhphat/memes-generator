import * as types from "../constants/meme.constants";

const initialState = {
  memes: [],
  totalPageNum: 1,
  loading: false,
  selectedMeme: null,
  singleMeme: [],
};

const memeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_MEMES_REQUEST:
    case types.GET_SINGLE_MEME_REQUEST:
    case types.CREATE_MEME_REQUEST:
    case types.UPDATE_MEME_REQUEST:
    case types.DELETE_MEME_REQUEST:
      return { ...state, loading: true };

    case types.GET_MEMES_FAILURE:
    case types.GET_SINGLE_MEME_FAILURE:
    case types.CREATE_MEME_FAILURE:
    case types.UPDATE_MEME_FAILURE:
    case types.DELETE_MEME_FAILURE:
      return { ...state, loading: false };

    // GET ALL MEMES
    case types.GET_MEMES_SUCCESS:
      return {
        ...state,
        memes: payload.memes,
        totalPageNum: payload.totalPages,
        loading: false,
      };

    // GET SINGLE MEME
    case types.GET_SINGLE_MEME_SUCCESS:
      return {
        ...state,
        singleMeme: payload,
        loading: false,
      };

    // CREATE & UPDATE MEME
    case types.CREATE_MEME_SUCCESS:
    case types.UPDATE_MEME_SUCCESS:
      return {
        ...state,
        selectedMeme: {
          ...state.selectedMeme,
          ...payload.meme,
          localImageUrl: `${process.env.REACT_APP_BACKEND_API}/${
            payload.outputMemePath.split("public/")[1]
          }?${payload.updatedAt}`,
        },
        singleMeme: payload,
        loading: false,
      };

    // DELETE MEME
    case types.DELETE_MEME_SUCCESS:
      return { ...state, loading: false };

    // SELECTED MEME
    case types.SET_SELECTED_MEME:
      return { ...state, selectedMeme: payload };
    default:
      return state;
  }
};

export default memeReducer;
