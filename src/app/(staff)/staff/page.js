"use client";
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import ChatSidebar from "@/src/component/Staff/ChatSidebar";
import ChatWindow from "@/src/component/Staff/ChatWindow";

export default function StaffPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);

  const contacts = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setMessages([{ text: `Hello ${contact.name}!`, isSentByUser: false }]);
  };

  const handleSendMessage = (text) => {
    if (text.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, isSentByUser: true },
      ]);
    }
  };

  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", p: 2, height: "95vh" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={12} md={4}>
          <ChatSidebar
            contacts={contacts}
            onSelectContact={handleSelectContact}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ChatWindow
            selectedContact={selectedContact}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
