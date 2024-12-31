import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import BlueTick from "@/public/blue-tick.svg";

export const TeacherAvatars = () => {
    return (
        <div className=" flex flex-col justify-center items-center">
            
            <h1 className="ps-5 xl:container text-2xl sm:text-4xl text-bold tracking-tight font-bold text-slate-800">
            Learn from the best
            </h1>
            <div className="flex flex-col gap-y-4 max-w-7xl mx-auto w-full px-3.5 md:px-5 mt-10 max-sm:mt-6">
                <div className="flex max-sm:flex-col justify-center w-full gap-4">
                    {data1.map((teacher, index) => (
                        <div className="px-2 py-1 flex items-center border  rounded-3xl justify-between w-full  lg:w-[19%]" key={index}>
                            <div className="flex items-center gap-x-2">
                                <div>
                                    <Avatar className="w-full">
                                        <AvatarImage
                                            src={
                                                teacher.avatar ||
                                                "https://res.cloudinary.com/dabitzf0t/image/upload/v1735454147/fy4lhekjgn7fwoaecwpz.jpg"
                                            }
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="font-semibold text-base text-slate-900">{teacher.name}</div>
                            </div>
                            <div>
                                <BlueTick className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 lg:grid-cols-5 gap-x-4 w-full">
                    {data2.map((teacher, index) => (
                        <div className="px-2 py-1 flex border  items-center rounded-3xl justify-between" key={index}>
                            <div className="flex items-center gap-x-2">
                                <div>
                                    <Avatar className="w-full">
                                        <AvatarImage
                                            src={
                                                teacher.avatar ||
                                                "https://res.cloudinary.com/dabitzf0t/image/upload/v1735454147/fy4lhekjgn7fwoaecwpz.jpg"
                                            }
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="font-semibold text-base text-slate-900">{teacher.name}</div>
                            </div>
                            <div>
                                <BlueTick className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

const data1 = [
    { avatar: "", name: "Jude Bellingham" },
    { avatar: "", name: "David Beckham" },
    { avatar: "", name: "Vinicius Juniour" },
];

const data2 = [
    { avatar: "", name: "Rodrygo" },
    { avatar: "", name: "E. Militao" },
    { avatar: "", name: "Camavinga" },
    { avatar: "", name: "Ancelloti" },
    { avatar: "", name: "K. Mbappe" },
]

{/* <div className="text-black font-bold text-5xl">
    Learn from the best
</div> */}