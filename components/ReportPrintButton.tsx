"use client";

export default function ReportPrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="btn btn-outline" onClick={() => window.print()}>
      {label}
    </button>
  );
}
