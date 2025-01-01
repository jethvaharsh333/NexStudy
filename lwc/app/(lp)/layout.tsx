"use client"
import { useState } from "react";
import { Feature } from "./_components/feature";
import Footer from "./_components/footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import Navbar from "./_components/navbar";
import { Student } from "./_components/student";
import { StudentTestimonial } from "./_components/student-testimonial";
import { Teacher } from "./_components/teacher";
import { TeacherAvatars } from "./_components/teacher-avatars";
import { InsidePlatform } from "./_components/inside-platform";

const WholeLayout = ({ children }: { children: React.ReactNode }) => {
    const [navbarHeight, setNavbarHeight] = useState(0);

  const handleNavbarHeightChange = (height: number) => {
    setNavbarHeight(height);
  };
    
    return (
        <div className="relative overflow-visible scroll-smooth">
            <Header onHeightChange={handleNavbarHeightChange} />
            <main style={{ paddingTop: navbarHeight }}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default WholeLayout;