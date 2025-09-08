import { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const StatsPage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("urls") || "[]");
    setUrls(data);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Expiry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((item, i) => (
            <TableRow key={i}>
              <TableCell>http://localhost:3000/{item.shortcode}</TableCell>
              <TableCell>{item.originalUrl}</TableCell>
              <TableCell>{item.clicks.length}</TableCell>
              <TableCell>{new Date(item.expiry).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default StatsPage;
