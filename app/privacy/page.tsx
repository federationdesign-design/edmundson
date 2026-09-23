import type { Metadata } from "next";
import { StubPage } from "../../components/StubPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return <StubPage title="Privacy Policy" />;
}
