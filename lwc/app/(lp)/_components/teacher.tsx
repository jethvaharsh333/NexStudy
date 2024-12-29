"use client";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import Section3A from "@/public/assets/Section_3A.jpg";
import Section3B from "@/public/assets/Section_3B.jpg"
import Section3C from "@/public/assets/Section_3C.jpg"
import Section3D from "@/public/assets/Section_3D.jpg"

export const Teacher = () => {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="py-4 my-10 lg:min-h-screen">
                <h1 className="ps-5 2xl:container text-2xl sm:text-4xl text-bold tracking-tight font-bold text-slate-800">
                    Transform Knowledge Into Impact 🧑‍🏫
                </h1>
            <div className="mt-10 max-sm:mt-6">
                <Carousel items={cards} />
            </div>
        </div>
    )
}

const data = [
    {
        category: "Effortless Course Creation",
        title: "Our tools make course creation simple, even for first-time instructors.",
        src: "https://res.cloudinary.com/dabitzf0t/image/upload/v1735460368/lwc-project-test/HOME_PAGE/Section_4A.jpg",
    },
    {
        category: "Global Reach",
        title: "Share your expertise with learners worldwide.",
        src: "https://res.cloudinary.com/dabitzf0t/image/upload/v1735460368/lwc-project-test/HOME_PAGE/Section_4B.jpg",
    },
    {
        category: "Earn as You Teach",
        title: "Turn your expertise into a rewarding income.",
        src: "https://res.cloudinary.com/dabitzf0t/image/upload/v1735460368/lwc-project-test/HOME_PAGE/Section_4C.jpg",
    },
    {
        category: "Continuous Growth",
        title: "Leverage insights to refine your teaching impact.",
        src: "https://res.cloudinary.com/dabitzf0t/image/upload/v1735460368/lwc-project-test/HOME_PAGE/Section_4D.jpg",
    },
];