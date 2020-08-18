import React, { useState, useEffect } from "react";
import axios from "axios";

const MangaForm = ({ saveManga, addManga }) => {
  const [name, setName] = useState("");
  const [manga, setManga] = useState(null);

  useEffect(() => {
    saveManga(manga);
    addManga(manga);
  }, [manga, saveManga]);

  const fetchInfo = () => {
    axios
      .get(`https://api.jikan.moe/v3/search/manga?q=${name}&page=1`)
      .then((response) => {
        const resManga = response.data.results[0];
        const mangaObj = {
          title: resManga.title,
          chapAmt: resManga.chapters,
          syn: resManga.synopsis,
          malScore: resManga.score,
          image: resManga.image_url,
          url: resManga.url,
        };
        setManga(mangaObj);
        console.log(resManga);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchInfo();
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex"
      style={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 40,
      }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Enter Manga name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default MangaForm;
