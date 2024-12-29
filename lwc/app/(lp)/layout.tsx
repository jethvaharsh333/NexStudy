import { Feature } from "./_components/feature";
import Footer from "./_components/footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import Navbar from "./_components/navbar";
import { Student } from "./_components/student";
import { StudentTestimonial } from "./_components/student-testimonial";
import { Teacher } from "./_components/teacher";

const WholeLayout = ({children}:{children:React.ReactNode}) => {
    return(
        
        <>
            <Header/>
            <Hero/>
            <Feature/>
            <Student/>
            <Teacher/>
            <StudentTestimonial/>
            {/* <div className="h-screen">

            </div> */}
        </>
    )
}

export default WholeLayout;