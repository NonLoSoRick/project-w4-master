import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const authString = btoa("arnold:K9d2 igSP HM21 KIEK DJyp Yuk6");
    let media = null;

    const mediaUpload = () => {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        return fetch("http://localhost/progetti_WP/project-wp/wordpress/wp-json/wp/v2/media", {
          headers: {
            Authorization: `Basic ${authString}`,
          },
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Errore durante il caricamento dell'immagine");
            }
            return response.json();
          })
          .then((img) => {
            console.log("Immagine caricata:", img);
            media = img.id;
          });
      } else {
        return Promise.resolve();
      }
    };

    const addPost = () => {
      return fetch("http://localhost/progetti_WP/project-wp/wordpress/wp-json/wp/v2/posts", {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ title, content, status: "publish", featured_media: media }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore durante la creazione dell'articolo");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Articolo creato:", data);
        });
    };

    mediaUpload()
      .then(addPost)
      .catch((error) => {
        console.error("Errore durante la creazione dell'articolo:", error.message);
        // Aggiungi qui la gestione dell'errore, ad esempio mostrando un messaggio all'utente
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Container>
      <h2>Crea un nuovo articolo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formContent">
          <Form.Label>Contenuto</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Inserisci il contenuto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Immagine</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Crea articolo
        </Button>
      </Form>
    </Container>
  );
};

export default CreateArticle;
