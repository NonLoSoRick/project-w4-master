import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Article = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost/progetti_WP/project-wp/wordpress/wp-json/wp/v2/posts/${id}?_embed=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, [id]);

  return (
    post && (
      <>
        <Container fluid>
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>

          {post._embedded["wp:term"] && (
            <div className="mb-4">
              <h4>Author: {post._embedded["author"][0].name}</h4>
              {post._embedded["wp:term"][0].map((category) => (
                <span key={category.id} className="badge rounded-pill text-bg-warning">
                  {category.name}
                </span>
              ))}
              <Card.Text
                dangerouslySetInnerHTML={{ __html: post.date }}
                className="badge rounded-pill text-bg-warning ms-1"
              ></Card.Text>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
          <img
            alt=""
            src={
              post._embedded["wp:featuredmedia"]
                ? post._embedded["wp:featuredmedia"][0].source_url
                : "/assets/picsum53.jpg"
            }
          />
        </Container>
      </>
    )
  );
};
export default Article;
