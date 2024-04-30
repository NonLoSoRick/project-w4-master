import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [deletes, setDeletes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      `http://localhost/progetti_WP/project-wp/wordpress/wp-json/wp/v2/posts/?page=${currentPage}&per_page=6&_embed=1`
    )
      .then((res) => {
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.error("errore", error);
      });
  }, [currentPage, deletes]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  function generatePaginationArray() {
    let paginationArr = [];
    for (let index = 1; index <= lastPage; index++) {
      paginationArr.push({
        n: index,
        active: currentPage === index,
      });
    }

    return paginationArr;
  }

  const deletePost = (postId) => {
    const authString = btoa("arnold:K9d2 igSP HM21 KIEK DJyp Yuk6");

    fetch(`http://localhost/progetti_WP/project-wp/wordpress/wp-json/wp/v2/posts/${postId}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setDeletes(deletes + 1);
      }
    });
  };

  return (
    <div>
      <Container>
        <div className="d-flex  align-item-baseline mb-4">
          <h1 className="me-2">Blog</h1>
          <div className="mt-3 ms-auto">
            <Link to="/create-article">
              <Button variant="primary">Crea un nuovo articolo</Button>
            </Link>
          </div>
        </div>
        <Row>
          {posts &&
            posts.map((post) => (
              <Col xs={12} md={6} lg={4} key={post.id} className="g-3">
                <Card className="d-flex justify-content-center">
                  <Card.Img
                    variant="top"
                    src={
                      post._embedded["wp:featuredmedia"]
                        ? post._embedded["wp:featuredmedia"][0].source_url
                        : "public/img/krafttraining-fuer-frauen.webp"
                    }
                  />
                  <Card.Body>
                    <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }}></Card.Title>
                    <Card.Text
                      dangerouslySetInnerHTML={{ __html: post.date }}
                      className="badge rounded-pill text-bg-warning"
                    ></Card.Text>
                    <Card.Text dangerouslySetInnerHTML={{ __html: post.content.rendered }}></Card.Text>
                    <div className="d-flex justify-content-end">
                      <Button variant="primary" className="m-1 p-1" href={`/article/${post.id}`}>
                        visualizza
                      </Button>
                      <Button className="btn btn-danger m-1 p-1" onClick={() => deletePost(post.id)}>
                        Elimina
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}{" "}
        </Row>{" "}
        <nav className="mt-5">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <span className="page-link" onClick={() => currentPage !== 1 && changePage(currentPage - 1)}>
                Precedente
              </span>
            </li>

            {generatePaginationArray().map((page) => (
              <li key={page.n} className={`page-item ${page.active && "active"}`}>
                <span className="page-link" onClick={() => changePage(page.n)}>
                  {page.n}
                </span>
              </li>
            ))}

            <li className={`page-item ${currentPage === lastPage && "disabled"}`}>
              <span className="page-link" onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}>
                Successiva
              </span>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};
export default Blog;
