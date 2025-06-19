import Navbar from "@/components/layout/Navbar";

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar />
            <div className=" mr-6 pt-12">
                {children}
            </div>
        </div>
    );
};