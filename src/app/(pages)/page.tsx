import MdxComponent from "@/common/components/elements/MdxComponent";
import { fetchFileFromRepo } from "@/lib/github";
import { Suspense } from "react";

export default async function Home() {
	const markdown = await fetchFileFromRepo(['docs', 'tech', 'md001.md'].join('/'));

  return (
	<Suspense>
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
		<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
			<MdxComponent markdown={markdown} />
		</main>
		</div>
	</Suspense>
  );
}
