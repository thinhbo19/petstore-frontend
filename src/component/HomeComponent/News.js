"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Pagination,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/src/services/slugifyConfig";
import { formatDate } from "@/src/hooks/useFormatTime";
import slugify from "slugify";
import { getAllNews } from "@/src/services/apiNews";

const News = () => {
  const [page, setPage] = useState(1);
  const [allNews, setAllNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState(allNews);

  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllNews();
        setAllNews(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [allNews]);

  useEffect(() => {
    // Lọc bài viết khi searchTerm thay đổi
    const result = allNews.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(result);
    setPage(1); // Reset trang khi tìm kiếm
  }, [searchTerm, allNews]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const currentNews = filteredNews.slice(startIndex, endIndex);

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Right section (30%) */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* Search bar */}
          <TextField
            fullWidth
            label="Search Articles"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginBottom: "20px" }}
          />

          {/* Latest articles */}
          <Typography variant="h6" gutterBottom>
            Latest Articles
          </Typography>
          <List>
            {allNews.slice(0, 5).map((article, index) => (
              <ListItem key={index} button>
                <ListItemText
                  primary={article.title + " " + formatDate(article.createdAt)}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Left section (70%) */}
        <Grid item xs={12} md={8}>
          {currentNews.length > 0 ? (
            <Grid container spacing={2} justifyContent="center">
              {currentNews.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Link
                    href={`/news/${slugify(article.title)}`}
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                      }}
                    >
                      <CardActionArea>
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={300}
                          height={200}
                          style={{ objectFit: "cover" }}
                        />
                        <CardContent>
                          <Typography
                            variant="h6"
                            component="div"
                            noWrap
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontWeight: "bold",
                            }}
                          >
                            {article.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {article.firstWord}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                height: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                There is no relevant news
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {currentNews.length > 0 && (
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.ceil(filteredNews.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default News;
