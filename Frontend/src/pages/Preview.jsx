import { useState, useEffect } from "react";
import { fetchArticles } from "../api/articles";
import { 
  Container, Typography, Card, CardContent, CardActions, 
  Pagination, Box, Divider 
} from "@mui/material";

const Preview = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const articlesPerPage = 5; // Adjust as needed

  useEffect(() => {
    const getData = async () => {
      const offset = (page - 1) * articlesPerPage;
      const data = await fetchArticles(articlesPerPage, offset, "publish");
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.total / articlesPerPage)); 
    };
    getData();
  }, [page]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Blog Preview
      </Typography>

      {/* Articles List */}
      <Box>
        {articles.map((article) => (
          <Card 
            key={article.id} 
            sx={{ mb: 3, p: 2, boxShadow: 3, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {article.title}
              </Typography>
              <Typography 
                variant="subtitle2" 
                color="primary" 
                fontWeight="medium" 
                gutterBottom
              >
                {article.category}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {article.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <CardActions sx={{ justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          size="large"
          shape="rounded"
        />
      </CardActions>
    </Container>
  );
};

export default Preview;
