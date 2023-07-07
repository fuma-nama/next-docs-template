import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col flex-1 items-center justify-center container">
            <h1 className="font-bold text-4xl">Next Docs</h1>
            <Link
                href="/docs"
                className="border mt-2 px-6 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"
            >
                Open
            </Link>
        </main>
    );
}
