import { PageHeader } from "@/components/PageHeader";
import { brand } from "@/config/brand";

export const metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <div className="mx-auto max-w-3xl space-y-4 px-4 pb-24 text-muted md:px-8">
        <p>This is placeholder text for the demo. Replace it with {brand.fullName}'s own Privacy Policy before launch.</p>
      </div>
    </>
  );
}
