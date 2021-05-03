import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memeActions } from "../redux/actions/meme.actions";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const selectedMeme = useSelector((state) => state.meme.selectedMeme);
  const loading = useSelector((state) => state.meme.loading);

  const handleImportImage = async (fileList) => {
    const files = inputFile.current.files;
    const meme = {
      uploadedImage: files[0],
      localImageUrl: window.URL.createObjectURL(files[0]),
    };
    dispatch(memeActions.setSelectedMeme(meme));
  };

  const handleSubmitImage = () => {
    dispatch(memeActions.createMemeRequest(selectedMeme.uploadedImage));
  };

  const handleCancel = () => {
    dispatch(memeActions.setSelectedMeme(null));
  };

  return (
    <div id="home" className="home">
      {selectedMeme && selectedMeme.id ? <Sidebar /> : ""}
      {selectedMeme ? (
        <div className="main-content main-content--selected">
          <div className="container">
            <img src={selectedMeme.localImageUrl} alt="Selected Meme" />
            {selectedMeme.id ? (
              ""
            ) : (
              <div className="btns">
                <button onClick={handleCancel} disabled={loading}>
                  Cancel
                </button>
                {loading ? (
                  <button className="mr-3" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </button>
                ) : (
                  <button className="mr-3" onClick={handleSubmitImage}>
                    Take this image
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="main-content main-content--default">
          <p>
            Please select a meme in the gallery <br /> or{" "}
            <label className="import-image-label" htmlFor="local-meme">
              <input
                type="file"
                ref={inputFile}
                className="import-image-label-input"
                onChange={() => handleImportImage()}
                accept="image/png, image/jpeg"
                id="local-meme"
              />
              <span>upload an image</span>.
            </label>
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
