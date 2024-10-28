// components/ChatWindow.js
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

export default function ChatWindow({
  selectedContact,
  messages,
  onSendMessage,
}) {
  const [newMessage, setNewMessage] = useState("");

  return (
    <Paper
      elevation={2}
      sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          {selectedContact
            ? `Chat with ${selectedContact.name}`
            : "Select a contact to start chatting"}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <Typography
            key={index}
            align={msg.isSentByUser ? "right" : "left"}
            sx={{
              mb: 1,
              color: msg.isSentByUser ? "primary.main" : "text.primary",
              fontStyle: msg.isSentByUser ? "italic" : "normal",
            }}
          >
            {msg.text}
          </Typography>
        ))}
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onSendMessage(newMessage);
            setNewMessage("");
          }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
}
