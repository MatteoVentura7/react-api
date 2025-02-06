import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// const article = {
//   title: "",
//   author: "",
//   content: "",
//   category: "",
//   avaible: true,
// };

function FormList() {
  const [blogsList, setBlogsList] = useState([]);

  const [productFormData, setProductFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
  });

  const addProducts = () => {
    axios.get("http://localhost:3001/post").then(function (res) {
      const blogs = res.data;
      setBlogsList(blogs);
    });
  };
  const handleDeleteList = (id) => {
    axios
      .delete(`http://localhost:3001/post/${id}`)
      .then(function () {
        setBlogsList((currentList) =>
          currentList.filter((post) => post.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error delete:", error);
      });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const tagsArray = productFormData.tags
      ? productFormData.tags.split(",").map((tag) => tag.trim())
      : [];
    const newProduct = {
      ...productFormData,

      tags: tagsArray,
    };
    axios.post("http://localhost:3001/posts", newProduct).then((res) => {
      setBlogsList([...blogsList, res.data]);
      setProductFormData({ title: "", content: "", tags: "", image: "" });
    });
    console.log(productFormData);
  };

  useEffect(addProducts, []);

  // const [list, setList] = useState([]);
  // const [formDataArticle, setformDataArticle] = useState(article);

  // const hanldeFormList = (fieldName, value) => {
  //   setformDataArticle((curentState) => ({
  //     ...curentState,
  //     [fieldName]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setList((currentList) => [...currentList, formDataArticle]);
  //   setformDataArticle({
  //     title: "",
  //     author: "",
  //     content: "",
  //     category: "",
  //     avaible: false,
  //   });
  // };

  // const handleArticleList = (productDeleteArticle) => {
  //   setList((currentState) =>
  //     currentState.filter((product) => product !== productDeleteArticle)
  //   );
  // };

  // const handleDeleteList = () => {
  //   setList([]);
  // };

  return (
    <div className="container">
      <h1>Lista blogs</h1>
      <div className="button"></div>
      <div className="row">
        {blogsList.map((elm) => {
          return (
            <div className="col" key={elm.id}>
              <div className="card">
                <button
                  className="btn"
                  onClick={() => handleDeleteList(elm.id)}
                >
                  x
                </button>
                <h3 className="title">{elm.title}</h3>
                <div className="detaills">
                  <div className="text col-details">
                    <ul>
                      {elm.tags.map((tag, index) => {
                        return <li key={index}>{tag}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="image col-details">
                    <img src={elm.image} alt={elm.title} />
                  </div>
                </div>
                <p>{elm.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="form-data">
        <hr />
        <h1>Aggiungi prodotto</h1>
        <form onSubmit={handleSumbit}>
          <input
            type="text"
            value={productFormData.title}
            placeholder="inserisci il nome"
            onChange={(e) =>
              setProductFormData({
                ...productFormData,
                title: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={productFormData.content}
            placeholder="inserisci il content"
            onChange={(e) =>
              setProductFormData({
                ...productFormData,
                content: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={productFormData.tags}
            placeholder="inserisci dei tag"
            onChange={(e) =>
              setProductFormData({ ...productFormData, tags: e.target.value })
            }
          />
          <input
            type="text"
            value={productFormData.image}
            placeholder="inserisci l'url"
            alt=""
            onChange={(e) =>
              setProductFormData({
                ...productFormData,
                image: e.target.value,
              })
            }
          />
          <button type="submit">Invia</button>
        </form>
      </div>
    </div>
  );
}

export default FormList;
