import { useEffect, useState } from "react";
import { Container, Form, Button, Table, Modal } from "react-bootstrap";
import "./AdminNews.css";

function AdminNews() {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    headline: "",
    caption: "",
    publishedAt: "",
    imageUrl: "",
    author: "",
    category: "",
    content: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add", "edit", "delete"
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Erro ao buscar notícias:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = (type, id = null) => {
    setModalType(type);
    setSelectedId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmAction = () => {
    if (modalType === "add") {
      handleSubmit();
    } else if (modalType === "edit") {
      handleEditConfirm();
    } else if (modalType === "delete") {
      handleDeleteConfirm();
    }
    handleCloseModal();
  };

  const handleSubmit = () => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `http://localhost:3000/news/${editingId}` : "http://localhost:3000/news";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({
          headline: "",
          caption: "",
          publishedAt: "",
          imageUrl: "",
          author: "",
          category: "",
          content: "",
        });
        setEditingId(null);
        fetch("http://localhost:3000/news")
          .then((res) => res.json())
          .then((data) => setNews(data));
      });
  };

  const handleEdit = (article) => {
    setEditingId(article._id);
    setFormData({
      headline: article.headline,
      caption: article.caption,
      publishedAt: article.publishedAt.split("T")[0],
      imageUrl: article.imageUrl,
      author: article.author,
      category: article.category,
      content: article.content,
    });
  };

  const handleEditConfirm = () => {
    handleSubmit();
  };

  const handleDelete = (id) => {
    handleOpenModal("delete", id);
  };

  const handleDeleteConfirm = () => {
    fetch(`http://localhost:3000/news/${selectedId}`, { method: "DELETE" })
      .then(() => {
        setNews(news.filter((article) => article._id !== selectedId));
      });
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      headline: "",
      caption: "",
      publishedAt: "",
      imageUrl: "",
      author: "",
      category: "",
      content: "",
    });
  };

  return (
    <Container className="admin-container">
      <h1 className="text-center mb-4">📌 Administração de Notícias</h1>

      {/* Formulário para Adicionar/Editar Notícias */}
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleOpenModal(editingId ? "edit" : "add");
      }} className="admin-form">
        <Form.Group>
          <Form.Label>📢 Título</Form.Label>
          <Form.Control type="text" name="headline" value={formData.headline} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>📝 Legenda</Form.Label>
          <Form.Control type="text" name="caption" value={formData.caption} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>📅 Data</Form.Label>
          <Form.Control type="date" name="publishedAt" value={formData.publishedAt} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>🖼️ URL da Imagem</Form.Label>
          <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>✍️ Autor</Form.Label>
          <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>📂 Categoria</Form.Label>
          <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>📖 Conteúdo</Form.Label>
          <Form.Control as="textarea" rows={3} name="content" value={formData.content} onChange={handleChange} required />
        </Form.Group>

        <Button variant={editingId ? "warning" : "success"} type="submit" className="mt-3">
          {editingId ? "Salvar Edição" : "Adicionar Notícia"}
        </Button>
      </Form>

      {/* Lista de Notícias */}
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Título</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {news.map((article) => (
            <tr key={article._id}>
              <td>{article.headline}</td>
              <td>{new Date(article.publishedAt).toLocaleDateString()}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(article)}>Editar</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(article._id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botão para Criar Nova Notícia */}
      <div className="text-center mt-4">
        <Button variant="primary" size="lg" onClick={handleCreateNew}>
          Criar Nova Notícia
        </Button>
      </div>

      {/* Modal de Confirmação */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <p className="text-center">
            {modalType === "add" && "Adicionar notícia ao site?"}
            {modalType === "edit" && "Salvar as alterações desta notícia?"}
            {modalType === "delete" && "Você tem certeza que quer apagar a notícia?"}
          </p>
          <div className="text-center">
            <Button variant="danger" onClick={handleCloseModal} className="me-2">Não</Button>
            <Button variant="success" onClick={handleConfirmAction}>Sim</Button>
          </div>
        </Modal.Body>
      </Modal>

    </Container>
  );
}

export default AdminNews;
