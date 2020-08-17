import React, { useState, useEffect } from "react";
import MangaForm from "./component/MangaForm";

const App = () => {
  const [chapter, setChapter] = useState("");
  const [name, setName] = useState("");
  const [manga, setManga] = useState(null);
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    console.log(mangaList);
  }, [manga, name, mangaList]);

  const updateChapter = (index, chap) => {
    const newList = [...mangaList];
    newList[index].chapter = chap;
    setChapter(newList);
  };

  const addManga = (manga) => {
    const newList = [...mangaList, manga];
    setMangaList(newList);
  };

  return (
    <div>
      <div className="jumbotron">
        <h1>Manga List App</h1>
      </div>
      <div className="container">
        <MangaForm
          saveName={setName}
          saveManga={setManga}
          addManga={addManga}
        />
        <ul>
          {mangaList.map((mag, index) => {
            return mag ? (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <div>{mag.title}</div>{" "}
                <div>{`${mag.chapter ? mag.chapter : 0}/${mag.chapAmt}`}</div>
                <div>{`mal score: ${mag.malScore}`}</div>
                <select
                  className="custom-select"
                  id="inputGroupSelect"
                  style={{ width: "10%" }}
                >
                  <option defaultValue>Rate</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateChapter(index, chapter);
                    setChapter("");
                  }}
                >
                  <input
                    type="text"
                    onChange={(e) => setChapter(e.target.value)}
                    value={mag.chapter}
                    style={{ width: "15%" }}
                    placeholder="chp"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setChapter("");
                    }}
                  />
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </form>
                <img src={mag.image} alt={mag.title} width="5%" />
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
