import { useEffect, useState } from "react";
import axios from "axios";

export default function () {
  const [characters, setCharacters] = useState([]);

  const handleDelete = (characterId) => {
    setCharacters((currentState) =>
      currentState.filter((character) => character.id !== characterId)
    );
  };

  const fetchPosts = () => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      setCharacters(res.data.results);
    });
  };

  const resetPosts = () => {
    setCharacters([]);
  };

  useEffect(fetchPosts, []);

  return (
    <>
      <div className="container">
        <div className="btn">
          <button onClick={fetchPosts} className="upload">
            Carica personaggi
          </button>
          <button onClick={resetPosts} className="reset">
            Cancella lista
          </button>
        </div>
        <div className="cards">
          {characters.map((character) => {
            return (
              <>
                <div key={character.id} className="person">
                  <div className="person-img">
                    {<img src={character.image} alt="img" />}
                  </div>
                  <div className="person-info">
                    <h2>{character.name}</h2>
                    <h4>
                      {character.status} - {character.species}
                    </h4>
                    <h4>{character.gender}</h4>
                  </div>
                  <div className="delete-btn">
                    <button
                      type="button"
                      onClick={() => handleDelete(character.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
