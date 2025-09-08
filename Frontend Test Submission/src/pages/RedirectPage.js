import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logger from "../middleware/logger";

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("urls") || "[]");
    const entry = data.find(item => item.shortcode === shortcode);

    if (!entry) {
      alert("Invalid shortcode!");
      navigate("/");
      return;
    }

    if (Date.now() > entry.expiry) {
      alert("Link expired!");
      navigate("/");
      return;
    }

    // Log click
    entry.clicks.push({
      timestamp: new Date().toISOString(),
      source: document.referrer || "Direct",
      geo: "Mock-Location",
    });

    localStorage.setItem("urls", JSON.stringify(data));
    logger("Redirected", { shortcode, to: entry.originalUrl });

    window.location.href = entry.originalUrl;
  }, [shortcode, navigate]);

  return null;
};

export default RedirectPage;
