import { useState, useEffect } from "react";
import { deleteArticle, fetchArticles, updateArticle } from "../api/articles";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  IconButton, Tabs, Tab 
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchArticles(100, 0); // Fetch a larger dataset
      setArticles(data.articles);
      filterArticles(data.articles, "draft"); // Default to Draft tab
    };
    getData();
  }, []);

  // Filter articles based on status
  const filterArticles = (data, status) => {
    setFilteredArticles(data.filter(article => article.status === status));
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const status = ["draft", "publish", "trash"][newValue];
    filterArticles(articles, status);
  };

  // Move article to trash
  const moveToTrash = async (id) => {
    await deleteArticle(id);

    const updatedArticles = articles.map(article =>
      article.id === id ? { ...article, status: "trash" } : article
    );
    setArticles(updatedArticles);
    filterArticles(updatedArticles, ["draft", "publish", "trash"][selectedTab]);
  };

  return (
    <Paper>
      {/* Tabs for switching between Draft, Published, and Trash */}
      <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab label="Draft" />
        <Tab label="Published" />
        <Tab label="Trash" />
      </Tabs>

      {/* Table for showing articles */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredArticles.map((article, index) => (
              <TableRow key={article.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  {selectedTab !== 2 && ( // Hide Edit button in Trash tab
                    <IconButton onClick={() => navigate(`/edit/${article.id}`)}>
                      <Edit />
                    </IconButton>
                  )}
                  {selectedTab !== 2 ? (
                    <IconButton onClick={() => moveToTrash(article.id)}>
                      <Delete />
                    </IconButton>
                  ) : (
                    <span>Deleted</span> // Show "Deleted" text instead of a button in Trash
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AllPosts;
