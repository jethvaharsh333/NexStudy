import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";

export const InsidePlatform = () => {

    const tabs = [
        {
            title: "Product",
            value: "product",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Product Tab</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Services",
            value: "services",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Services tab</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Playground",
            value: "playground",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Playground tab</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Content",
            value: "content",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Content tab</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Random",
            value: "random",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Random tab</p>
                    <DummyContent />
                </div>
            ),
        },
    ];

    return (
        <div className="py-4 my-10 lg:min-h-screen" id="inside-platform">
            <h1 className="ps-5 xl:container text-2xl sm:text-4xl text-bold tracking-tight font-bold text-slate-800">
                Inside Platform 
            </h1>
            <div className="max-w-7xl mx-auto w-full px-3.5 md:px-5 mt-10 max-sm:mt-6">
                <div className="h-[20rem] sm:h-[30rem] md:h-[35rem] lg:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto items-start justify-start">
                    <Tabs tabs={tabs} contentClassName="flex justify-center" />
                </div>
            </div>
        </div>
    )
}

const DummyContent = () => {
    return (
        <Image
            src="https://res.cloudinary.com/dabitzf0t/image/upload/v1735454147/fy4lhekjgn7fwoaecwpz.jpg"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-none  h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    );
};