import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track order",
  description: "Track the status of your Individual order.",
  robots: { index: false },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
