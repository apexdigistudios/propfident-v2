import { Navbar } from "@/components/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-full overflow-x-hidden">{children}</div>
    </>
  );
}