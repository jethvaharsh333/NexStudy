"use client";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import Section3A from "@/public/assets/Section_3A.jpg";
import Section3B from "@/public/assets/Section_3B.jpg"
import Section3C from "@/public/assets/Section_3C.jpg"
import Section3D from "@/public/assets/Section_3D.jpg"

export const Student = () => {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="py-4 my-10 lg:min-h-screen">
                <h1 className="ps-5 2xl:container text-2xl sm:text-4xl text-bold tracking-tight font-bold text-slate-800">
                    Empower Your Learning Journey 🧑‍🎓
                </h1>
            <div className="mt-10 max-sm:mt-6">
                <Carousel items={cards} />
            </div>
        </div>
    )
}

const data = [
    {
        category: "Learn at Your Own Pace",
        title: "Flexible lessons for your busy life.",
        src: "https://res.cloudinary.com/dabitzf0t/image/upload/v1735454147/fy4lhekjgn7fwoaecwpz.jpg",
    },
    {
        category: "Track Your Growth",
        title: "Stay motivated with personalized insights.",
        src: "https://res.cloudinary.com/dabitzf0t/image/upload/v1735454147/qmnrzicayu6n8xxjhf2m.jpg",
    },

    {
        category: "Access Premium Materials",
        title: "Download notes and resources anytime.",
        src: "https://res.cloudinary.com/dabitzf0t/image/upload/v1735454147/q62wllbuj2vx8o2luhu7.jpg",
    },
    {
        category: "Learn from the Best",
        title: "Experts simplify complex topics for real-world impact.",
        src: "https://res.cloudinary.com/dabitzf0t/image/upload/v1735454147/okefjee6fvnogaarahuz.jpg",
    },
];