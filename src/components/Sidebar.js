import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeActions } from "../redux/actions/meme.actions";

const ALIGNMENT_X = [
  { value: "HORIZONTAL_ALIGN_LEFT", view: "Left" },
  { value: "HORIZONTAL_ALIGN_CENTER", view: "Center" },
  { value: "HORIZONTAL_ALIGN_RIGHT", view: "Right" },
];

const ALIGNMENT_Y = [
  { value: "VERTICAL_ALIGN_TOP", view: "Top" },
  { value: "VERTICAL_ALIGN_MIDDLE", view: "Middle" },
  { value: "VERTICAL_ALIGN_BOTTOM", view: "Bottom" },
];

const COLORS = ["BLACK", "WHITE"];
const FONT_SIZES = [8, 16, 32, 64, 128];

const Sidebar = () => {
  const [texts, setTexts] = useState([
    {
      id: "text_top",
      content: "",
      color: "BLACK",
      size: 32,
      alignmentX: "HORIZONTAL_ALIGN_CENTER",
      alignmentY: "VERTICAL_ALIGN_TOP",
    },
    {
      id: "text_bottom",
      content: "",
      color: "BLACK",
      size: 32,
      alignmentX: "HORIZONTAL_ALIGN_CENTER",
      alignmentY: "VERTICAL_ALIGN_BOTTOM",
    },
  ]);

  const selectedMeme = useSelector((state) => state.meme.selectedMeme);
  const loading = useSelector((state) => state.meme.loading);
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedMeme?.id) {
      dispatch(memeActions.updateMemeRequest(texts, selectedMeme.id));
    }
  };

  const handleEditInput = ({ textId, type, value }) => {
    const temp = JSON.parse(JSON.stringify(texts));
    temp.map((text) => {
      if (text.id === textId) {
        if (type in text) text[type] = value;
      }
      return text;
    });
    setTexts(temp);
  };

  const handleCancel = () => {
    dispatch(memeActions.setSelectedMeme(null));
  };

  const handleFinish = (e) => {
    dispatch(memeActions.setSelectedMeme(null));
  };

  useEffect(() => {
    if (selectedMeme?.id) {
      if (selectedMeme?.texts?.length) {
        setTexts((texts) => {
          return texts.map((text, index) => ({
            ...text,
            ...selectedMeme.texts[index],
          }));
        });
      }
    }
  }, [selectedMeme]);

  return (
    <div id="sidebar" className="sidebar">
      <form onSubmit={handleFormSubmit}>
        {texts.map(
          ({ id, content, color, size, alignmentX, alignmentY }, index) => (
            <div className="container" key={id}>
              <p className="sidebar__heading">TEXT {index + 1}</p>
              <div className="sidebar__group">
                <input
                  type="text"
                  value={content}
                  onChange={(e) =>
                    handleEditInput({
                      textId: id,
                      type: "content",
                      value: e.target.value,
                    })
                  }
                  placeholder="Text content.."
                />
              </div>
              <div className="sidebar__group">
                <p className="label">Color</p>
                <div className="value">
                  <select
                    value={color}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "color",
                        value: e.target.value,
                      })
                    }
                  >
                    {COLORS.map((color) => (
                      <option value={color} key={color}>
                        {color[0] + color.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sidebar__group">
                <p className="label">Font Size</p>
                <div className="value">
                  <select
                    value={size}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "size",
                        value: e.target.value,
                      })
                    }
                  >
                    {FONT_SIZES.map((size) => (
                      <option value={size} key={size}>
                        {size}px
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sidebar__group">
                <p className="label">Vertical Align</p>
                <div className="value">
                  <select
                    value={alignmentX}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "alignmentX",
                        value: e.target.value,
                      })
                    }
                  >
                    {ALIGNMENT_X.map((alignment) => (
                      <option value={alignment.value} key={alignment.value}>
                        {alignment.view}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sidebar__group">
                <p className="label">Horizontal Align</p>
                <div className="value">
                  <select
                    value={alignmentY}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "alignmentY",
                        value: e.target.value,
                      })
                    }
                  >
                    {ALIGNMENT_Y.map((alignment) => (
                      <option value={alignment.value} key={alignment.value}>
                        {alignment.view}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )
        )}
        <div className="btns container">
          <button
            disabled={!selectedMeme?.id || loading}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" disabled={!selectedMeme?.id || loading}>
            Submit
          </button>
          <button
            disabled={!selectedMeme?.id || loading}
            onClick={handleFinish}
            className="full"
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
