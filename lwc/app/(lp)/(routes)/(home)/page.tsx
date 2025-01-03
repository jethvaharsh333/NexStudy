import Image from 'next/image';
import home_image_1 from "../../../../public/assets/home_image_1.jpg";
import home_image_2 from "../../../../public/assets/home_image_2.jpg";
import home_image_3 from "../../../../public/assets/home_image_3.jpg";
import { Hero } from '../../_components/Hero';
import { Feature } from '../../_components/feature';
import { Student } from '../../_components/student';
import { Teacher } from '../../_components/teacher';
import { StudentTestimonial } from '../../_components/student-testimonial';
import { TeacherAvatars } from '../../_components/teacher-avatars';
import { InsidePlatform } from '../../_components/inside-platform';

const Home = () => {
  return (
    <>
      <Hero />
      <Feature />
      <Student />
      <Teacher />
      <StudentTestimonial />
      <TeacherAvatars />
      {/* <InsidePlatform /> */}
    </>
  )
}

export default Home;