import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Stack,
  Grid,
  useMediaQuery,
  CardMedia,
  Grow,
  ButtonGroup,
  Button,
  Pagination,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { formatDate } from "@/src/hooks/useFormatTime";

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (!reviews?.length) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.star, 0);
  return totalRating / reviews.length;
};

// Custom scrollbar styles
const customScrollbarStyle = {
  maxHeight: "600px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
};

// User Review Item Component
const ReviewItem = ({ review }) => (
  <ListItem alignItems="flex-start">
    <Grow in>
      <Stack direction="row" spacing={2} width="100%">
        <Avatar>{review.username.charAt(0).toUpperCase()}</Avatar>
        <ListItemText
          primary={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", marginRight: 1 }}
              >
                {review.username}
              </Typography>
              <Rating
                value={review.star}
                precision={0.5}
                readOnly
                size="small"
                aria-label={`User rating: ${review.star}`}
              />
            </Box>
          }
          secondary={
            <>
              <Box
                sx={{
                  maxHeight: "600px",
                  overflowY: "auto",
                  ...customScrollbarStyle, // Apply custom scrollbar style
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {formatDate(review.dateComment)}
              </Typography>
              {/* Display feedback images if available */}
              {review.feedback_img && review.feedback_img.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {review.feedback_img.map((imgUrl, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
                      <CardMedia
                        component="img"
                        image={imgUrl}
                        alt={`Feedback image ${idx + 1}`}
                        sx={{
                          maxHeight: 200,
                          maxWidth: "100%",
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          }
        />
      </Stack>
    </Grow>
  </ListItem>
);

// Main Component for Reviews
const PetReviews = ({ reviews }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // State for selected star filter
  const [selectedStar, setSelectedStar] = useState(null); // null means no filter

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  // Memoized values for performance
  const filteredReviews = useMemo(() => {
    return selectedStar
      ? reviews.filter((review) => review.star === selectedStar)
      : reviews;
  }, [reviews, selectedStar]);

  const sortedReviews = useMemo(() => {
    return [...filteredReviews].sort(
      (a, b) => new Date(b.dateComment) - new Date(a.dateComment)
    );
  }, [filteredReviews]);

  const totalReviews = filteredReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const currentReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return sortedReviews.slice(startIndex, endIndex);
  }, [currentPage, sortedReviews]);

  const averageRating = useMemo(
    () => calculateAverageRating(reviews),
    [reviews]
  );

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Button Styles
  const getButtonStyle = (star) => ({
    fontWeight: selectedStar === star ? "bold" : "normal",
    backgroundColor: selectedStar === star ? "#F84A2F" : "transparent",
    color: selectedStar === star ? "#fff" : theme.palette.text.primary,
    minWidth: isSmallScreen ? "40px" : "auto", // Shrink buttons on small screens
    padding: isSmallScreen ? "4px 8px" : "8px 16px", // Adjust padding for smaller screens
    fontSize: isSmallScreen ? "0.75rem" : "1rem", // Smaller font size on smaller screens
    "&:hover": {
      backgroundColor:
        selectedStar === star ? "#F84A2F" : theme.palette.action.hover,
    },
  });

  return (
    <Box
      sx={{
        maxWidth: isSmallScreen ? "100%" : isMediumScreen ? "80%" : "600px",
        margin: "auto",
        padding: isSmallScreen ? 1 : 2,
      }}
    >
      {/* Header: Total reviews and average rating */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          User Reviews
        </Typography>
        <Rating
          value={averageRating || 0}
          precision={0.1}
          readOnly
          size="large"
          aria-label={`Average rating: ${averageRating.toFixed(1)}`}
        />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {averageRating > 0 ? averageRating.toFixed(1) : "0"} out of 5 (
          {totalReviews} reviews)
        </Typography>
      </Box>

      {/* Star Filter Buttons */}
      <Box display="flex" justifyContent="center" mb={3}>
        <ButtonGroup
          variant="outlined"
          color="primary"
          sx={{
            flexDirection: "row", // Always keep it in a row
          }}
        >
          <Button
            onClick={() => setSelectedStar(null)}
            sx={getButtonStyle(null)}
          >
            All
          </Button>
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              onClick={() => setSelectedStar(star)}
              sx={getButtonStyle(star)}
            >
              {star} Star
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Display reviews list */}

      {totalReviews === 0 ? (
        <Typography variant="h6" align="center">
          No reviews available
        </Typography>
      ) : (
        <>
          <List>
            {currentReviews.map((review, index) => (
              <React.Fragment key={index}>
                <ReviewItem review={review} />
                {index < currentReviews.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>

          {/* Pagination controls */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default PetReviews;
