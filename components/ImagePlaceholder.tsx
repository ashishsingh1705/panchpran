import styles from "./ImagePlaceholder.module.css";

export default function ImagePlaceholder({
  subject,
  crop,
  className,
  style,
}: {
  subject: string;
  crop?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`${styles.placeholder} ${className ?? ""}`}
      style={style}
      role="img"
      aria-label={`Photography placeholder: ${subject}`}
    >
      <span className={styles.label}>
        {subject}
        {crop && <span className={styles.labelMono}>crop — {crop}</span>}
      </span>
    </div>
  );
}
