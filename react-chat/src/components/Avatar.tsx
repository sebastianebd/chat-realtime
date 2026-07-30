interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md";
}

export function Avatar({ src, alt, size = "md" }: AvatarProps) {
  const className = size === "sm" ? "avatar-small" : "message-avatar";

  return <img src={src} alt={alt} className={className} />;
}
