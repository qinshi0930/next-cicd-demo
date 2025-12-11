import MdxComponent from "@/common/elements/MdxComponent";
import { Suspense } from "react";

export default async function Home() {
	const baseUrl = 'http://localhost:3000'
	const res = fetch(`${baseUrl}/api/posts/docs/tech/md001.md`);
	const markdown = await (await res).text()
	// const [markdown, setMarkdown] = useState("");
	// useEffect(() => {
	// 	fetch('/api/posts/docs/tech/md001.md')
	// 		.then(res => res.text())
	// 		.then(md => setMarkdown(md));
	// }, []);


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
