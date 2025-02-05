import { useState } from "react";

const initialShoppingListData = [
  {
    id: 1,
    title: "Il computer",
    author: "Matteo",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam harum, unde a repudiandae cumque ipsum libero blanditiis voluptates fugit adipisci nesciunt debitis accusantium consequuntur? Quasi molestias porro impedit placeat quae!",
    category: "FrontEnd",
  },
  {
    id: 2,
    title: "HTML",
    author: "Paolo",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam harum, unde a repudiandae cumque ipsum libero blanditiis voluptates fugit adipisci nesciunt debitis accusantium consequuntur? Quasi molestias porro impedit placeat quae!",
    category: "BackEnd",
  },
  {
    id: 3,
    title: "La cucina italiana",
    author: "Gianni",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam harum, unde a repudiandae cumque ipsum libero blanditiis voluptates fugit adipisci nesciunt debitis accusantium consequuntur? Quasi molestias porro impedit placeat quae!",
    category: "UI/UX",
  },
];

const initialFormData = {
  title: "",
  author: "",
  content: "",
  category: "",
};

function FormList() {
  const [shoppingList, setShoppingList] = useState(initialShoppingListData);
  const [formData, setFormData] = useState(initialFormData);
  const handleFormField = (value, fieldName) => {
    setFormData((currentState) => ({ ...currentState, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: shoppingList[shoppingList.length - 1].id + 1,
      title: formData.title,
      author: formData.author,
      content: formData.content,
      category: formData.category,
    };
    setShoppingList((currentState) => [...currentState, newProduct]);
    // Reset dei campi
    setFormData(initialFormData);
  };

  const emptyList = () => {
    setShoppingList([]);
  };

  const handleDelete = (productId) => {
    setShoppingList((currentState) =>
      currentState.filter((product) => product.id !== productId)
    );
  };

  return (
    <div>
      <ul>
        {shoppingList.map((product) => (
          <li key={product.id}>
            <strong>Titolo: </strong>
            {product.title} <br />
            <strong>Autore: </strong>
            {product.author} <br />
            <strong>Contenuto: </strong>
            {product.content} <br />
            <strong>Categoria: </strong>
            {product.category} <br />
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDelete(product.id)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <button onClick={emptyList}>Cancella lista</button>
      <hr />
      <h3>Aggiungi Articolo</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titolo articolo</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleFormField(e.target.value, "title")}
          />
        </div>
        <div>
          <label htmlFor="author">Autore articolo</label>
          <input
            id="author"
            type="text"
            value={formData.author}
            onChange={(e) => handleFormField(e.target.value, "author")}
          />
        </div>
        <div>
          <label htmlFor="content">contenuto articolo</label>
          <input
            id="content"
            type="text"
            value={formData.content}
            onChange={(e) => handleFormField(e.target.value, "content")}
          />
        </div>

        <div>
          <label for="category">Scegli una categoria</label>

          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={(e) => handleFormField(e.target.value, "category")}
          >
            <option value="FrontEnd">FrontEnd</option>
            <option value="BackEnd">BackEnd</option>
            <option value="UI/UX">UI/UX</option>
          </select>
        </div>
        <div>
          <button type="submit">Invia</button>
        </div>
      </form>
    </div>
  );
}

export default FormList;
