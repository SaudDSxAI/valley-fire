import { PageHeader } from "@/components/PageHeader";
import { brand } from "@/config/brand";

export const metadata = { title: "Terms of Service" };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <div className="mx-auto max-w-3xl space-y-4 px-4 pb-24 text-muted md:px-8">
        <p>This is placeholder text for the demo. Replace it with {brand.fullName}'s own Terms of Service before launch.</p>
      </div>
    </>
  );
}
