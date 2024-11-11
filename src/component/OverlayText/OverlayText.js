import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export function OverlayText({ IMG, title }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "200px", sm: "300px", md: "600px" },
        position: "relative",
      }}
    >
      <Image
        src={IMG}
        alt="Spa Service"
        layout="fill"
        objectFit="cover"
        style={{ filter: "brightness(0.5)" }}
        priority
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "3rem", md: "4rem" },
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export function OverlayText1({ IMG }) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        height: { xs: "200px", sm: "300px", md: "500px" },
        position: "relative",
        mb: { xs: 2, md: 0 },
      }}
    >
      <Image
        src={IMG}
        alt="Spa Service"
        layout="fill"
        objectFit="cover"
        style={{ filter: "brightness(0.5)", borderRadius: "8px" }}
        priority
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          HOTEL SERVICES
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
            mt: 1,
          }}
        >
          With the reputable pet sitting service at Pet House, you can feel
          secure when going to work, traveling, or on business trips.
        </Typography>
        <Box sx={{ textAlign: "left" }}>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            }}
            component="h5"
          >
            ✔️ Delicious food tailored to preferences.
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            }}
            component="h5"
          >
            ✔️ Cleaned twice a day.
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            }}
            component="h5"
          >
            ✔️ Fun activities with friends.
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            }}
            component="h5"
          >
            ✔️ Daily massages.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export function OverlayText2({ IMG }) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        height: { xs: "200px", sm: "300px", md: "500px" },
        position: "relative",
        mb: { xs: 2, md: 0 },
      }}
    >
      <Image
        src={IMG}
        alt="Spa Service"
        layout="fill"
        objectFit="cover"
        style={{ filter: "brightness(0.5)", borderRadius: "8px" }}
        priority
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          SPA SERVICES
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
            mt: 1,
          }}
        >
          With the reputable pet sitting service at Pet House, you can feel
          secure when going to work, traveling, or on business trips.
        </Typography>
        <Box sx={{ textAlign: "left" }}>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            }}
            component="h5"
          >
            ✔️ Delicious food tailored to preferences.
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            }}
            component="h5"
          >
            ✔️ Cleaned twice a day.
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            }}
            component="h5"
          >
            ✔️ Fun activities with friends.
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            }}
            component="h5"
          >
            ✔️ Daily massages.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
