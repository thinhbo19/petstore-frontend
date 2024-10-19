"use client";
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f0f4f8",
  borderRadius: "8px",
  boxShadow: theme.shadows[5],
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[8],
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: "0 auto",
  border: `4px solid ${theme.palette.secondary.main}`,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const AboutUs = () => {
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Về Chúng Tôi
      </Typography>

      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom color="secondary">
          Chúng tôi là ai?
        </Typography>
        <Typography paragraph>
          Chúng tôi là một nhóm yêu thích động vật, với sứ mệnh cung cấp dịch vụ
          chăm sóc thú cưng tốt nhất cho những người bạn bốn chân của bạn. Với
          nhiều năm kinh nghiệm trong ngành, chúng tôi cam kết mang đến sự chăm
          sóc tận tâm và chuyên nghiệp cho thú cưng của bạn.
        </Typography>
      </StyledPaper>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <StyledPaper elevation={3}>
            <StyledAvatar alt="Người sáng lập" src="/images/founder.jpg" />
            <Typography variant="h6" gutterBottom>
              Nguyên
            </Typography>
            <Typography paragraph>
              Người sáng lập với đam mê chăm sóc thú cưng. Đam mê và tận tâm với
              từng khách hàng.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledPaper elevation={3}>
            <StyledAvatar alt="Nhân viên" src="/images/staff.jpg" />
            <Typography variant="h6" gutterBottom>
              Minh
            </Typography>
            <Typography paragraph>
              Nhân viên chăm sóc thú cưng chuyên nghiệp, luôn sẵn sàng hỗ trợ
              bạn.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledPaper elevation={3}>
            <StyledAvatar alt="Nhân viên" src="/images/staff2.jpg" />
            <Typography variant="h6" gutterBottom>
              Lan
            </Typography>
            <Typography paragraph>
              Chuyên gia huấn luyện thú cưng, giúp thú cưng của bạn trở nên
              ngoan ngoãn hơn.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom color="secondary">
          Tại sao chọn chúng tôi?
        </Typography>
        <Typography paragraph>
          - Đội ngũ nhân viên chuyên nghiệp và yêu động vật.
          <br />
          - Dịch vụ đa dạng từ chăm sóc, tắm rửa đến huấn luyện thú cưng.
          <br />- Không gian thân thiện và an toàn cho thú cưng.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Liên hệ với chúng tôi
        </Typography>
        <Typography paragraph>
          Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email
          hoặc số điện thoại. Chúng tôi luôn sẵn sàng hỗ trợ bạn!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="mailto:example@example.com"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Liên hệ ngay
        </Button>
      </StyledPaper>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="textSecondary">
          © 2023 Dịch vụ chăm sóc thú cưng. Tất cả các quyền được bảo lưu.
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default AboutUs;
