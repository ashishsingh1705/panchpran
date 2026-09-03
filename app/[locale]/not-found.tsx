import Link from "next/link";
import staticStyles from "@/components/StaticPage.module.css";

export default function LocaleNotFound() {
  return (
    <div className={staticStyles.hero} style={{ minHeight: "40vh" }}>
      <span className="eyebrow mono">404</span>
      <h1 className={staticStyles.h1Latin}>Page not found</h1>
      <p className={staticStyles.lead}>
        The page you are looking for does not exist, or has moved.
      </p>
      <Link href="/hi" className="btn btn-primary" style={{ marginTop: 24, width: "fit-content" }}>
        Return home
      </Link>
    </div>
  );
}
