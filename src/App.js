import React, { useState } from "react";
import MangaForm from "./component/MangaForm";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

const App = () => {
  const [chapter, setChapter] = useState("");
  const [manga, setManga] = useState(null);
  const [mangaList, setMangaList] = useState([]);

  const updateChapter = (index, chap) => {
    const newList = [...mangaList];
    newList[index].chapter = chap;
    setChapter(newList);
  };

  const addManga = (manga) => {
    const newList = [...mangaList, manga];
    setMangaList(newList);
  };

  const deleteManga = (cd) => {
    const newList = [...mangaList];
    newList.splice(cd, 1);
    setMangaList(newList);
  };

  return (
    <div className="">
      <div className="jumbotron">
        <h1>Manga List App</h1>
      </div>
      <div style={{ width: "100%" }} className=" mainDiv">
        <MangaForm saveManga={setManga} addManga={addManga} />
        <ul className="list" style={{ width: "90%" }}>
          {mangaList.map((mag, index) => {
            return mag ? (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ width: "%100" }}
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
                  <DropdownButton
                    id="chapterDropdown"
                    title="Chapter"
                    variant="outline-primary"
                    size="sm"
                    key={index}
                  >
                    <div
                      style={{
                        width: "70%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="align-items-center"
                    >
                      <input
                        type="text"
                        onChange={(e) => setChapter(e.target.value)}
                        value={chapter}
                        style={{ width: "55%" }}
                        placeholder="chp"
                      />
                      <button className="btn btn-info btn-sm" type="submit">
                        ok
                      </button>
                    </div>
                  </DropdownButton>
                </form>
                <img src={mag.image} alt={mag.title} width="5%" />
                <DropdownButton
                  drop="left"
                  title="Info"
                  variant="secondary"
                  size="sm"
                  key={index}
                >
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={mag.image} width="150" />
                    <Card.Body
                      style={{
                        overflowY: "scroll",
                        height: 200,
                        padding: "1rem",
                      }}
                    >
                      <Card.Title>{mag.title}</Card.Title>
                      <Card.Text className="overflow-scroll">
                        {mag.syn}
                      </Card.Text>
                    </Card.Body>
                    <Button
                      variant="outline-secondary"
                      href={mag.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more at MAL
                    </Button>
                  </Card>
                </DropdownButton>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteManga(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
