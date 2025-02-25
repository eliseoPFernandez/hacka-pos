import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Collapse } from "react-bootstrap";
import "./NewsList.css"; // Importando o CSS externo para estilos personalizados

function NewsList() {
  const [news, setNews] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Erro ao buscar notícias:", err));
  }, []);

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="news-page">
      <Container>
        <h1 className="text-center news-title">
          📰 Últimas Notícias
        </h1>
        <Row className="justify-content-center">
          {news.length === 0 ? (
            <p className="text-center loading-text">Carregando...</p>
          ) : (
            news.map((article, index) => (
              <Col md={8} key={article._id} className="mb-4">
                <Card className="news-card">
                  <Card.Body>
                    <Card.Title className="news-headline">{article.headline}</Card.Title>
                    <Card.Text className="news-caption">{article.caption}</Card.Text>
                    <Card.Text className="news-date">📅 {new Date(article.publishedAt).toLocaleDateString()}</Card.Text>
                    
                    {/* Botão para expandir a notícia */}
                    <Button 
                      className="news-button"
                      onClick={() => toggleCollapse(index)}
                      aria-controls={`collapse-${index}`}
                      aria-expanded={openIndex === index}
                    >
                      {openIndex === index ? "Ver menos" : "Ver mais"}
                    </Button>

                    {/* Collapse com detalhes da notícia */}
                    <Collapse in={openIndex === index}>
                      <div id={`collapse-${index}`} className="mt-3">
                        {article.imageUrl && (
                          <Card.Img variant="top" src={article.imageUrl} alt={article.headline} className="news-image" />
                        )}
                        <Card.Text className="news-content">{article.content}</Card.Text>
                        <Card.Text><strong>Autor:</strong> {article.author}</Card.Text>
                        <Card.Text><strong>Categoria:</strong> {article.category}</Card.Text>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default NewsList;
