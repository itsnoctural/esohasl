import { UploadForm } from "@/components/upload-form";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const user = await auth();

  if (!user) redirect("/signin");

  return <UploadForm />;
}
