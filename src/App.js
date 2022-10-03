import { useState, useEffect } from "react";
import List from "./List";
import "./App.css";
import CompletedList from "./Completed-list";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [{ id: "12525", title: "Prove everyone that programming is fun" }];
  }
};
const getLocalStorageComplete = () => {
  let completeList = localStorage.getItem("completeList");
  if (completeList) {
    return (completeList = JSON.parse(localStorage.getItem("completeList")));
  } else {
    return [
      { id: "1925", title: "Build a beautiful To Do List app" },
      { id: "1125", title: "Keep it simple" },
    ];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [completeList, setCompleteList] = useState(getLocalStorageComplete());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Input field must be filled out!");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);

      setName("");
    }
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  const removeItemComplete = (id) => {
    setCompleteList(completeList.filter((item) => item.id !== id));
  };

  const carStatus = (e) => {
    const { checked, value } = e.target;

    if (checked === true) {
      const specificItem = list.find((item) => item.id === value);

      setCompleteList([
        ...completeList,
        { id: specificItem.id, title: specificItem.title },
      ]);

      setList(list.filter((item) => item.id !== value));
    } else if (checked === false) {
      const specificItem = completeList.find((item) => item.id === value);

      setList([...list, { id: specificItem.id, title: specificItem.title }]);

      setCompleteList(completeList.filter((item) => item.id !== value));
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("completeList", JSON.stringify(completeList));
  }, [completeList, list]);
  return (
    <div className="container">
      <div className="Todo-list">
        <form onSubmit={handleSubmit} className="form-1">
          <div className="img1">
            <img
              alt="Todo-logo"
              src="https://todo-list-frontend.ednoram.vercel.app/logo.png"
              className="logo"
            />
            <h1
              style={{ color: "#1D7EAF", fontSize: "40px", fontWeight: "bold" }}
            >
              To Do Text
            </h1>
          </div>
          <div className="input-button" style={{ display: "flex" }}>
            <div className="input-1">
              <input
                type="text"
                className="Todo-list2"
                placeholder="To Do list"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              +
            </button>
          </div>
        </form>

        <div className="grocery-container" style={{ marginTop: "20px" }}>
          {list?.map((items) => {
            return (
              <List
                carStatus={carStatus}
                items={items}
                key={items.id}
                removeItem={removeItem}
                setList={setList}
                list={list}
              />
            );
          })}
          <div
            className="accordion"
            style={{ marginTop: "10px" }}
            id="accordionExample"
          >
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button comp"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Completed
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {completeList?.map((items) => {
                    return (
                      <CompletedList
                        carStatus={carStatus}
                        items={items}
                        key={items.id}
                        removeItemComplete={removeItemComplete}
                        setCompleteList={setCompleteList}
                        completeList={completeList}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
