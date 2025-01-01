"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import NexStudy from "@/public/white-logo.svg";

const Footer = () => {
    return (
        <div className="bg-slate-800 py-4 md:py-7 w-full  ">
            <div className="flex justify-center text-xl md:text-2xl text-white">
                NexStudy
            </div>
            <div className="mt-4 grid grid-cols-0 md:grid-cols-3 gap-y-5 md:gap-y-0 py-3 px-4 md:px-0 md:text-center text-white">
                <div className=" md:flex md:justify-center md:items-center box-border border-slate-200">
                    <ul className="flex flex-col gap-y-2">
                        <li className="text-xl md:mb-2">
                            <Link href="/">NAVIGATION LINKS</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="/explore-courses" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">Explore courses</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="/#features" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">Features</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="/#student" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">Student</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="/#teacher" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">Teacher</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="/#testimonials" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">Testimonials</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="/#inside-platform" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">Inside platform</Link>
                        </li>
                    </ul>
                </div>
                <div className="md:box-border md:flex justify-center items-center md:border-l-2 md:border-r-2 border-slate-200">
                    <ul className="flex flex-col gap-y-2">
                        <li className="text-xl md:mb-2">
                            <Link href="/">DEVELOPER</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="https://www.linkedin.com/in/harshjethva/" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">LinkedIn</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="https://github.com/jethvaharsh333" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">GitHub</Link>
                        </li>
                        <li className="ps-5 md:ps-0 text-base md:flex justify-center">
                            <Link href="https://leetcode.com/u/jethvaharsh333/" className="relative w-fit  block after:block after:content-[''] after:absolute after:h-[2px] leading-none after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left delay-150">Leetcode</Link>
                        </li>
                    </ul>
                </div>
                <div className="px-2 md:px-8 lg:px-14 xl:px-20 ">
                    <div className=" md:h-[150px] lg:h-[170px] xl:h-[170px]  rounded-lg flex justify-center items-center w-full ">
                        <NexStudy className="w-40 h-10 font-white"/>
                    </div>
                </div>

            </div>
            <div className="mt-3 px-6 text-xs text-white text-center">
                &copy; 2025 &#183; NexStudy &#183; ALL RIGHT RESERVED &#183; PRIVACY POLICY &#183; TERMS OF SERVICE
            </div>
        </div>
    )
}

export default Footer;