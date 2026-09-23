import type { Metadata } from "next";
import { StubPage } from "../../components/StubPage";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function Page() {
  return <StubPage title="Cookie Policy" />;
}
