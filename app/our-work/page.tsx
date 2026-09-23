import type { Metadata } from "next";
import { StubPage } from "../../components/StubPage";

export const metadata: Metadata = { title: "Our Work" };

export default function Page() {
  return <StubPage title="Our Work" />;
}
