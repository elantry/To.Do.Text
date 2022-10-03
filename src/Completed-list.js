import React, { useState } from "react";

const CompletedList = ({
  items,
  removeItemComplete,
  setCompleteList,
  completeList,
  carStatus,
}) => {
  const [checked, setChecked] = useState(true);
  const { id, title } = items;
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [name, setName] = useState(title);
  const handleEdit = (e) => {
    e.preventDefault();
    if (name && isEditing) {
      setCompleteList(
        completeList.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
    }
    setIsEditing(false);
  };

  const editItem = (id) => {
    setIsEditing(true);
    const specificItem = completeList.find((item) => item.id === id);
    setName(specificItem.title);

    setEditID(id);
  };
  return (
    <div className="grocery-list">
      <article className="grocery-item">
        {isEditing ? (
          <form onSubmit={handleEdit} className="form-1">
            <div className="input-button" style={{ display: "flex" }}>
              <div className="input-1">
                <input
                  type="text"
                  className="Todo-list2"
                  placeholder="Todo-list"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                <span className="MuiButton-label">
                  <svg
                    className="MuiSvgIcon-root"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="Tobo-p">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={id}
                  checked={checked}
                  id="flexCheckDefault"
                  onChange={carStatus}
                />
              </div>
              <p className="title" style={{ textDecoration: "line-through" }}>
                {title}
              </p>

              <div className="dropdown">
                <button
                  className="point dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      className="MuiSvgIcon-root"
                      focusable="false"
                      viewBox="0 0 24 24"
                      style={{ fill: "#3d9ecf" }}
                      aria-hidden="true"
                    >
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                    </svg>
                  </span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      type="button"
                      className="edit-btn dropdown-item"
                      onClick={() => editItem(id)}
                    >
                      edit
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="delete-btn dropdown-item"
                      onClick={() => removeItemComplete(id)}
                    >
                      delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </article>
    </div>
  );
};

export default CompletedList;
