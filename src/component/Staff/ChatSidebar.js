// components/ChatSidebar.js
import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Badge,
  Divider,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export default function ChatSidebar({ contacts, onSelectContact }) {
  return (
    <Paper elevation={2} sx={{ height: "100%", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Contacts
      </Typography>
      <List>
        {contacts.map((contact, index) => (
          <React.Fragment key={contact.id}>
            <ListItem
              button
              onClick={() => onSelectContact(contact)}
              sx={{
                borderRadius: 1,
                "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
              }}
            >
              {/* Avatar and Online Status */}
              <ListItemAvatar>
                <Badge
                  color="success"
                  variant="dot"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  overlap="circular"
                  badgeContent={
                    contact.isOnline && (
                      <CircleIcon sx={{ color: "green", fontSize: 10 }} />
                    )
                  }
                >
                  <Avatar alt={contact.name} src={contact.avatarUrl} />
                </Badge>
              </ListItemAvatar>

              {/* Name and Last Active Date */}
              <ListItemText
                primary={contact.name}
                secondary={`Last active: ${contact.lastActive}`}
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondaryTypographyProps={{
                  fontSize: "0.8rem",
                  color: "text.secondary",
                }}
              />
            </ListItem>

            {/* Divider between contacts */}
            {index < contacts.length - 1 && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
