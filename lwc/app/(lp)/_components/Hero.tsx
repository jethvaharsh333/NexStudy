"use client";

import { FlipWords } from "@/components/ui/flip-words";
import ArrowIcon from "@/public/assets/arrow-right.svg";
import StudentOne from "@/public/assets/hero-student1.jpg";
import Image from "next/image";
import { Laptop, Lightbulb, Video, ImageIcon, CheckCheck, MonitorSmartphone, DownloadCloud, BookCopy, PenSquare, PersonStanding, Files } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { FaPeopleArrows } from "react-icons/fa";
import StudentTwo from "@/public/assets/hero-student2.jpg"
import Teacher from "@/public/assets/hero-teacher.jpg"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const words = ["passion", "expertise", "innovation"];
  const router = useRouter();

  return (
    <section className="grid grid-cols-2 overflow-x-clip mb-2 z-0" id="">
      <div className="max-lg:col-span-2">
        <div className="container">
          <h1 className="max-sm:text-center overflow-hidden sm:mt-10 md:mt-10 lg:mt-20 text-5xl py-1 font-bold tracking-tighter bg-gradient-to-b from-black to-[#3e6478] text-transparent bg-clip-text  ">
            Blending
            <FlipWords words={words} />
            to elevate your learning success.
          </h1>
          <p className="text-xl text-[#010D3E] tracking-tight mt-6 ">
            Learn what you love and teach what you know on a platform that connects passionate learners with expert educators. Together, we create a thriving community where knowledge flows and growth never stops.
          </p>
          <div className="flex items-center gap-3 mt-[30px]">
            <LoginButton>
              <Button size="lg" className="text-md">Sign in</Button>
            </LoginButton>
            <Link href="/explore-courses">
              <button className="btn btn-text">
                <span className="">Explore courses</span>
                <ArrowIcon className="h-5 w-10 " />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-lg:col-span-2 container overflow-hidden relative z-0 h-[550px] ">
        <div className="hero-ring size-[320px] "></div>
        <div className="hero-ring size-[450px]"></div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rotate-0">
          <div className="size-[270px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90  [animation-duration:26s]">
              <IconBadge icon={Laptop} />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rotate-90">
          <div className="size-[270px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90  [animation-duration:26s]">
              <IconBadge icon={Video} />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rotate-180">
          <div className="size-[270px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90  [animation-duration:26s]">
              <IconBadge icon={ImageIcon} />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 -rotate-90">
          <div className="size-[270px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90  [animation-duration:26s]">
              <IconBadge icon={MonitorSmartphone} />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rotate-36">
          <div className="size-[365px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90  [animation-duration:26s]">
              <IconBadge icon={Lightbulb} />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rotate-108 ">
          <div className="size-[365px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90 [animation-duration:26s]">
              <IconBadge icon={DownloadCloud} />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rotate-180">
          <div className="size-[365px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90  [animation-duration:26s]">
              <IconBadge icon={BookCopy} />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rotate-252">
          <div className="size-[365px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90  [animation-duration:26s]">
              <IconBadge icon={Files} />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rotate-324">
          <div className="size-[365px] animate-spin [animation-duration:26s]">
            <div className="inline-flex  animate-reverse-spin -rotate-90  [animation-duration:26s]">
              <IconBadge icon={PenSquare} />
            </div>
          </div>
        </div>

        <div className="flex justify-center h-full items-center">
          <div className="w-56 h-56 rounded-full">
            <Image src={StudentOne} alt="Student Image" className="rounded-full" />
          </div>
        </div>
      </div>

      <div className="col-span-2 md:h-[470px] lg:h-[640px] xl:h-[810px] 2xl:h-[890px] 3xl:h-[990px] relative container ">
        <div className="md:relative w-full h-auto max-md:flex max-md:items-center max-md:justify-center flex-col gap-y-3">
          <div className="md:size-3/5">
            <Image src={Teacher} alt="Teacher Image" className="rounded-lg shadow-lg hover:-translate-x-1" />
          </div>
          <div className="md:absolute h-auto md:top-[65%] md:left-[40.1%] md:w-3/5 md:h-full md:-z-20">
            <Image src={StudentTwo} alt="Student Image" className="shadow-2xl rounded-lg w-full h-full " />
          </div>
        </div>
      </div>
    </section>
  );
};
