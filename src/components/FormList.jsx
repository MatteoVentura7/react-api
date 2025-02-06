import React from "react";
import { useState } from "react";
import axios from "axios";

const article = {
  title: "",
  author: "",
  content: "",
  category: "",
  avaible: true,
};

function FormList() {
  const [list, setList] = useState([]);
  const [formDataArticle, setformDataArticle] = useState(article);

  const hanldeFormList = (fieldName, value) => {
    setformDataArticle((curentState) => ({
      ...curentState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setList((currentList) => [...currentList, formDataArticle]);
    setformDataArticle({
      title: "",
      author: "",
      content: "",
      category: "",
      avaible: false,
    });
  };

  const handleArticleList = (productDeleteArticle) => {
    setList((currentState) =>
      currentState.filter((product) => product !== productDeleteArticle)
    );
  };

  const handleDeleteList = () => {
    setList([]);
  };

  return (
    <div className="container">
      <h1>Lista Articoli</h1>
      <ul>
        {list.map((product, index) => (
          <li key={product.title}>
            {index} <br />
            <strong>Titolo: </strong>
            {product.title} <br />
            <strong>Autore: </strong>
            {product.author} <br />
            <strong>Contenuto: </strong>
            {product.content} <br />
            <strong>Categoria: </strong>
            {product.category} <br />
            <strong>Stato: </strong>
            {product.avaible ? "pubblicato" : "non pubblicato"} <br />
            <button onClick={() => handleArticleList(product)}>🗑️</button>
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteList}>Cancella lista</button>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="inserisci il titolo"
            value={formDataArticle.title}
            onChange={(e) => hanldeFormList("title", e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="inserisci l'autore"
            value={formDataArticle.author}
            onChange={(e) => hanldeFormList("author", e.target.value)}
            required
          />
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="inserisci il contenuto"
            value={formDataArticle.content}
            onChange={(e) => hanldeFormList("content", e.target.value)}
            required
          />
        </div>
        <div>
          {" "}
          <label>Scegli una categoria</label>
          <select
            name="category"
            value={formDataArticle.category}
            onChange={(e) => hanldeFormList("category", e.target.value)}
            required
          >
            <option value="-">-</option>
            <option value="FrontEnd">FrontEnd</option>
            <option value="BackEnd">BackEnd</option>
            <option value="UI/UX">UI/UX</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Pubblica</label>
          <input
            type="checkbox"
            checked={formDataArticle.avaible}
            onChange={(e) => hanldeFormList("avaible", e.target.checked)}
          />
        </div>

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default FormList;
