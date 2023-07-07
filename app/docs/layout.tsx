import { ReactNode } from "react";
import { SidebarProvider, Sidebar } from "@/components/sidebar";
import clsx from "clsx";
import { tree } from "@/utils/page-tree";

export default function DocsLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div
                className={clsx(
                    "grid grid-cols-1 gap-12 container flex-1",
                    "lg:grid-cols-[250px_auto] xl:grid-cols-[250px_auto_150px] 2xl:grid-cols-[250px_auto_250px]"
                )}
            >
                <Sidebar items={tree} />
                {children}
            </div>
        </SidebarProvider>
    );
}
