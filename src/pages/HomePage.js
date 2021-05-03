import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memeActions } from "../redux/actions/meme.actions";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const selectedMeme = useSelector((state) => state.meme.selectedMeme);
  const loading = useSelector((state) => state.meme.loading);
  console.log(selectedMeme);

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
      <Sidebar />
      {selectedMeme ? (
        <div className="main-meme">
          <img src={selectedMeme.localImageUrl} alt="Selected Meme" />
          {selectedMeme.id ? (
            <div style={{ marginTop: "5em" }}>
              <button
                className="btn-block"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="d-flex m-3">
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
              <button onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>
          Please select a meme in the gallery <br />{" "}
          <label className="import-image-label" htmlFor="local-meme">
            <input
              type="file"
              ref={inputFile}
              className="import-image-label-input"
              onChange={() => handleImportImage()}
              accept="image/png, image/jpeg"
              id="local-meme"
            />
            or <span className="import-image-label-text">upload an image</span>.
          </label>
        </p>
      )}
    </div>
  );
};

export default HomePage;
