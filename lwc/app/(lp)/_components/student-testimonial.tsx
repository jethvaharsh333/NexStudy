import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Student from "@/public/assets/student-1.jpg"


export const StudentTestimonial = () => {
    return (
        <div className="py-4 my-10 lg:min-h-screen" id="testimonials">
            <h1 className="ps-5 2xl:container text-2xl sm:text-4xl text-bold tracking-tight font-bold text-slate-800">
                What Our Students Say
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 place-content-between max-w-7xl mx-auto w-full px-3.5 md:px-5 mt-10 max-sm:mt-6">
            {data.map((student, index) => (
                <CardContainer className="" key={index}>
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  h-auto w-auto rounded-xl p-6 border  ">
                        <div className="flex gap-x-3 items-center">
                            <CardItem translateZ="50">
                                <Avatar>
                                    <AvatarImage src={student.avatar || "https://res.cloudinary.com/dabitzf0t/image/upload/v1735454147/fy4lhekjgn7fwoaecwpz.jpg"} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </CardItem>
                            <CardItem translateZ={60} className="flex flex-col">
                                <div className="text-xl font-bold text-neutral-900 dark:text-white">
                                    {student.name}
                                </div>
                                <div className="text-md text-neutral-900 dark:text-white">
                                    {student.role}
                                </div>
                            </CardItem>
                        </div>
                        <CardItem
                            translateZ="60"
                            className="text-slate-900 text-md mt-5 dark:text-neutral-300"
                        >
                            {student.description}
                        </CardItem>
                        <CardItem className="text-end w-full" translateZ="50">
                            ⭐⭐⭐⭐⭐
                        </CardItem>
                    </CardBody>
                </CardContainer>
                ))}
            </div>
        </div>
    )
}

const data = [
    {
        avatar: "",
        name: "Sophia R.",
        role: "Marketing Student",
        description: "This platform has completely changed how I learn. The video lessons are clear and concise, and the progress tracking keeps me motivated. I love being able to access all my materials on the go!",
    },
    {
        avatar: "",
        name: "James T.",
        role: "Data Science Enthusiast",
        description: "I've always struggled with online learning, but this platform made it so easy. The resources are well-organized, and the instructors really know how to break down complex topics. Highly recommend!",
    },
    {
        avatar: "",
        name: "Emma P.",
        role: "Business Analyst",
        description: "The flexibility here is unmatched. I can learn at my own pace without feeling overwhelmed, and the downloadable resources are a great bonus. It's the perfect platform for busy professionals like me.",
    },
    {
        avatar: "",
        name: "Liam K.",
        role: "Graphic Design Learner",
        description: "From the moment I signed up, I felt supported. The courses are so well-structured, and the interactive materials really keep me engaged. I'm already seeing improvements in my skills!",
    },
    {
        avatar: "",
        name: "Anita S.",
        role: "Medical Student",
        description: "As a medical student, I appreciate how detailed and well-structured the courses are. The platform has made studying for exams much more manageable, and the extra materials are a lifesaver.",
    },
    {
        avatar: "",
        name: "Ravi K.",
        role: "Aspiring Software Developer",
        description: "I'm amazed by how easily I could learn coding fundamentals here. The instructors simplify complex concepts, and the practice assignments really helped me solidify my skills. A must for beginners like me!",
    },
    {
        avatar: "",
        name: "Alicia M.",
        role: "Wellness Enthusiast",
        description: "This platform gave me access to wellness courses that have changed my life. The yoga tutorials and mental health resources are incredible. It's like having a personal coach at home!",
    },
    {
        avatar: "",
        name: "Daniel W.",
        role: "Aspiring Photographer",
        description: "Learning photography here has been an eye-opening experience. The video lectures are top-notch, and the downloadable guides are perfect for practice. I'm finally confident in my skills!",
    },
    {
        avatar: "",
        name: "Mei L.",
        role: "Economics Student",
        description: "I was skeptical about online learning, but this platform completely changed my mind. The economics course I enrolled in was so engaging and easy to follow. I'm looking forward to my next course!",
    },
    {
        avatar: "",
        name: "Carlos G.",
        role: "Music Production Hobbyist",
        description: "I've always wanted to learn music production, and this platform made it possible. The step-by-step lessons and tools are incredibly intuitive. I'm already creating tracks I'm proud of!",
    },
    {
        avatar: "",
        name: "Emily D.",
        role: "Team Manager",
        description: "The leadership and management courses are exactly what I needed to level up my career. I've applied so many concepts from the lessons directly in my job, and the results speak for themselves.",
    },
    {
        avatar: "",
        name: "Ethan P.",
        role: "Language Learner",
        description: "As a language enthusiast, I've tried many learning platforms, but this one stands out. The interactive lessons and resources make learning a new language so much fun and effective!",
    },
]