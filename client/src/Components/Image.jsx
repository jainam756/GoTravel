export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "http://localhost:4000/uploads/" + src;
  return <img className="h-50 w-50" {...rest} src={src} alt={""} />;
}
