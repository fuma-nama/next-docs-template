import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getTableOfContents } from "next-docs-zeta/server";
import { getMDXComponent } from "next-contentlayer/hooks";
import { tree } from "@/utils/page-tree";
import React from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Heading } from "@/components/mdx/heading";
import { SafeLink } from "next-docs-zeta/link";
import { TOC } from "@/components/toc";

type Params = {
    slug?: string[];
};

export default async function Page({ params }: { params: Params }) {
    const path = (params.slug ?? []).join("/");
    const page = allDocs.find((page) => page.slug === path);

    if (page == null) {
        notFound();
    }

    const pathname = path.length === 0 ? "/docs" : "/docs/" + path;
    const toc = await getTableOfContents(page.body.raw);

    return (
        <>
            <article className="flex flex-col gap-6 py-8 overflow-x-hidden lg:py-16">
                <Breadcrumb pathname={pathname} tree={tree} />
                <h1 className="text-4xl font-bold">{page.title}</h1>
                <div className="prose">
                    <MdxContent code={page.body.code} />
                </div>
            </article>
            <div className="relative flex flex-col gap-3 max-xl:hidden py-16">
                <div className="sticky top-28 flex flex-col gap-3 overflow-auto max-h-[calc(100vh-4rem-3rem)]">
                    {toc.length > 0 && (
                        <h3 className="font-semibold">On this page</h3>
                    )}
                    <TOC items={toc} />
                </div>
            </div>
        </>
    );
}

function MdxContent({ code }: { code: string }) {
    const MDX = getMDXComponent(code);

    return (
        <MDX
            components={{
                a: SafeLink,
                h1: (props) => <Heading as="h1" {...props} />,
                h2: (props) => <Heading as="h2" {...props} />,
                h3: (props) => <Heading as="h3" {...props} />,
                h4: (props) => <Heading as="h4" {...props} />,
                h5: (props) => <Heading as="h5" {...props} />,
                h6: (props) => <Heading as="h6" {...props} />,
            }}
        />
    );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
    const path = (params.slug ?? []).join("/");
    const page = allDocs.find((page) => page.slug === path);

    if (page == null) return {};

    return {
        title: page.title,
        description: page.description,
    };
}

export async function generateStaticParams(): Promise<Params[]> {
    return allDocs.map((docs) => ({
        slug: docs.slug.split("/"),
    }));
}
