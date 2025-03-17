const Social = ({ company }) => {
  // Define social platforms and their icons
  const socialPlatforms = [
    { key: "facebook", icon: "fa-facebook-f", prefix: "https://www.facebook.com/" },
    { key: "twitter", icon: "fa-twitter", prefix: "https://twitter.com/" },
    { key: "bluesky", icon: "fa-cloud", prefix: "https://bsky.app/profile/" }, // Bluesky URLs are formatted like this
    { key: "instagram", icon: "fa-instagram", prefix: "https://www.instagram.com/" },
    { key: "linkedin", icon: "fa-linkedin-in", prefix: "https://www.linkedin.com/in/" },
    { key: "website", icon: "fa-globe", prefix: "" }, // Website should use the full value directly
  ];

  return (
    <div className="social-links">
      {socialPlatforms.map((platform) => {
        let url = company?.[platform.key];

        if (!url) return null; // Skip if no URL is provided

        // Special handling for Twitter: Check if the user entered a handle instead of a full URL
        if (platform.key === "twitter") {
          if (!url.startsWith("https://twitter.com/")) {
            url = platform.prefix + url.replace(/^@/, ""); // Remove '@' if present
          }
        } else if (platform.key !== "website" && !url.startsWith("http")) {
          // For other platforms (except website), prepend the correct prefix if missing
          url = platform.prefix + url;
        }

        return (
          <a key={platform.key} href={url} target="_blank" rel="noopener noreferrer">
            <i className={`fab ${platform.icon}`}></i>
          </a>
        );
      })}
    </div>
  );
};

export default Social;
