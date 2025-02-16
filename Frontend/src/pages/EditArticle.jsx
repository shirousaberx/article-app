import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticleById, updateArticle } from "../api/articles";
import { TextField, Button, Container } from "@mui/material";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: "", content: "", category: "", status: "draft" });

  useEffect(() => {
    const getArticle = async () => {
      const data = await fetchArticleById(id);
      setArticle(data);
    };
    getArticle();
  }, [id]);

  const handleUpdate = async (status) => {
    const updatedArticle = { ...article, status };
    await updateArticle(id, updatedArticle);
    alert("Article updated successfully!");
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <h2>Edit Article</h2>
      <TextField
        fullWidth
        label="Title"
        value={article.title}
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Content"
        value={article.content}
        onChange={(e) => setArticle({ ...article, content: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Category"
        value={article.category}
        onChange={(e) => setArticle({ ...article, category: e.target.value })}
        margin="normal"
      />
      <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={() => handleUpdate("draft")}>
        Draft
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleUpdate("publish")}>
        Publish
      </Button>
    </Container>
  );
};

export default EditArticle;
