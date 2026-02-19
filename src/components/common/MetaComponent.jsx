import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

export default function MetaComponent({ meta }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />

        {/* Open Graph Tags */}
        {meta?.ogUrl && <meta property="og:url" content={meta.ogUrl} />}
        <meta property="og:type" content={meta?.ogType || "website"} />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        {meta?.ogImage && <meta property="og:image" content={meta.ogImage} />}
        <meta property="og:site_name" content="Rugby Transfer Market" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta?.title} />
        <meta name="twitter:description" content={meta?.description} />
        {meta?.ogImage && <meta name="twitter:image" content={meta.ogImage} />}
      </Helmet>
    </HelmetProvider>
  );
}

MetaComponent.propTypes = {
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    ogUrl: PropTypes.string,
    ogType: PropTypes.string,
    ogImage: PropTypes.string,
  }),
};
