import { useState } from "react";
import { toast } from "react-toastify";

const ShareButtons = ({ url, title, description }) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "Rugby Player Profile");
  const encodedDescription = encodeURIComponent(
    description?.substring(0, 100) || "Check out this rugby player profile on Rugby Transfer Market"
  );

  const shareLinks = [
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#1da1f2",
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#0077b5",
    },
    {
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25d366",
    },
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877f2",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="share-buttons">
      {/* Copy Link Button */}
      <button
        onClick={copyToClipboard}
        className="theme-btn btn-style-one w-100 mb-3"
        style={{ fontSize: "14px" }}
      >
        <i className={`la ${copied ? "la-check" : "la-link"} mr-2`}></i>
        {copied ? "Copied!" : "Copy Profile Link"}
      </button>

      {/* Social Share Buttons */}
      <div className="social-links d-flex justify-content-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title={`Share on ${link.name}`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: link.color,
              color: "#fff",
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <i className={link.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
