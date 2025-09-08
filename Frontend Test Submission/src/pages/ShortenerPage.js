import { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import logger from "../middleware/logger";

const ShortenerPage = () => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateShortcode = () => Math.random().toString(36).substring(2, 7);

  const handleShorten = () => {
    if (!url.startsWith("http")) {
      setError("Invalid URL. Must start with http or https.");
      return;
    }

    const code = shortcode || generateShortcode();
    const expiry = Date.now() + (validity ? parseInt(validity) * 60000 : 30 * 60000);

    // Check uniqueness
    const data = JSON.parse(localStorage.getItem("urls") || "[]");
    if (data.some(item => item.shortcode === code)) {
      setError("Shortcode already exists!");
      return;
    }

    const newEntry = {
      shortcode: code,
      originalUrl: url,
      createdAt: Date.now(),
      expiry,
      clicks: [],
    };

    data.push(newEntry);
    localStorage.setItem("urls", JSON.stringify(data));

    logger("Shortened URL created", newEntry);
    setSuccess(`Short URL created: http://localhost:3000/${code}`);
    setError("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Original URL"
        fullWidth margin="normal"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <TextField
        label="Validity (minutes, optional)"
        fullWidth margin="normal"
        value={validity}
        onChange={e => setValidity(e.target.value)}
      />
      <TextField
        label="Custom Shortcode (optional)"
        fullWidth margin="normal"
        value={shortcode}
        onChange={e => setShortcode(e.target.value)}
      />
      <Button variant="contained" onClick={handleShorten}>Shorten</Button>
    </Container>
  );
};

export default ShortenerPage;
