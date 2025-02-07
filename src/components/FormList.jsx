import { useEffect, useState } from "react";
import axios from "axios";

const initialFormData = {
  name: "",
  image: "",
  status: "",
  species: "",
  gender: "",
};

export default function () {
  const [characters, setCharacters] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const handleFormField = (value, fieldName) => {
    setFormData((currentState) => ({
      ...currentState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCharacter = {
      id: characters[characters.length - 1].id + 1,
      name: formData.name,
      image: formData.image,
      status: formData.status,
      species: formData.species,
      gender: formData.gender,
    };
    setCharacters((currentState) => [...currentState, newCharacter]);
    setFormData(initialFormData);
  };

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
        <div className="form">
          <h3>Aggiungi un personaggio</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Inserisci il nome del personaggio</label>{" "}
              <br />
              <input
                type="text"
                value={formData.name}
                required
                onChange={(e) => {
                  handleFormField(e.target.value, "name");
                }}
              />
            </div>

            <div>
              <label htmlFor="status">Inserisci lo stato del personaggio</label>{" "}
              <br />
              <select
                name="status"
                id="status"
                value={formData.status}
                required
                onChange={(e) => {
                  handleFormField(e.target.value, "status");
                }}
              >
                <option value="-">-</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label htmlFor="status">Inserisci la specie personaggio</label>{" "}
              <br />
              <select
                name="species"
                id="species"
                value={formData.species}
                required
                onChange={(e) => {
                  handleFormField(e.target.value, "species");
                }}
              >
                <option value="-">-</option>
                <option value="Human">Human</option>
                <option value="Alien">Alien</option>
              </select>
            </div>

            <div>
              <label htmlFor="status">
                Inserisci il genere del personaggio
              </label>{" "}
              <br />
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                required
                onChange={(e) => {
                  handleFormField(e.target.value, "gender");
                }}
              >
                <option value="-">-</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label htmlFor="img">Inserisci url immagine</label> <br />
              <input
                id="img-form"
                type="text"
                required
                value={formData.image}
                onChange={(e) => handleFormField(e.target.value, "image")}
              />
            </div>
            <button className="btn-add" type="submit">
              Invia
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
