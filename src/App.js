import React, { useState } from "react";
import MangaForm from "./component/MangaForm";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import "./responsiveStyles.css";
import Modal from "react-bootstrap/Modal";
import IconButton from "@material-ui/core/IconButton";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const App = () => {
  const [chapter, setChapter] = useState("");
  const [manga, setManga] = useState(null);
  const [mangaList, setMangaList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const completeManga = (index) => {
    const newList = [...mangaList];
  };

  return (
    <>
      <div className="jumbotron">
        <h1>Manga List App</h1>
      </div>
      <div style={{ maxWidth: "100%" }} className=" mainDiv">
        <MangaForm saveManga={setManga} addManga={addManga} />
        <ul className="list" style={{ width: "90%", textAlign: "center" }}>
          {mangaList.map((mag, index) => {
            return mag ? (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                id="list-item"
                style={{ width: "%100" }}
                key={index}
              >
                <div>{mag.title}</div>{" "}
                <div id="needed-info">{`${mag.chapter ? mag.chapter : 0}/${
                  mag.chapAmt === 0 ? "ongoing" : mag.chapAmt
                }`}</div>
                <div id="needed-info">{`mal score: ${mag.malScore}`}</div>
                <select
                  className="custom-select"
                  id="needed-info"
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
                  id="needed-info"
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
                <img
                  src={mag.image}
                  alt={mag.title}
                  width="5%"
                  id="needed-info"
                />
                {/* mobile menu divider */}
                <IconButton id="info-btn">
                  <MenuBookIcon onClick={handleShow} />
                </IconButton>
                <Modal
                  show={show}
                  onHide={handleClose}
                  centered
                  id="info-model"
                >
                  <div>
                    <img src={mag.image} height />
                  </div>

                  <Modal.Header closeButton>
                    <Modal.Title>{mag.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {`chp: ${mag.chapAmt === 0 ? "ongoing" : mag.chapAmt}`}
                    <div class="dropdown-divider"></div>
                    {mag.syn}
                  </Modal.Body>
                  <div class="dropdown-divider"></div>
                  {`mal rating ${mag.malScore}`}
                  <div class="dropdown-divider"></div>
                  <div id="mobile-chp">
                    {`last read: ${mag.chapter ? mag.chapter : 0}`}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        updateChapter(index, chapter);
                        setChapter("");
                      }}
                    >
                      <DropdownButton
                        id="chapterDropdown"
                        title="Set Chp"
                        variant="outline-primary"
                        drop="up"
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
                  </div>
                  <div class="dropdown-divider"></div>
                  <Button
                    variant="outline-secondary"
                    href={mag.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more at MAL
                  </Button>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteManga(index)}
                  >
                    X
                  </button>
                </div>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
