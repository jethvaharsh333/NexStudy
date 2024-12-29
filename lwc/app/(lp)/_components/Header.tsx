"use client";
import NexStudy from "@/public/logo.svg"
import MenuIcon from "@/public/assets/menu.svg"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/login');
}
  return (
    <header className="sticky top-0 backdrop-blur-sm z-50">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* <Image height={130} width={150} alt='logo' src={NexStudy} /> */}
            <NexStudy className="w-40 h-10"/>
            <MenuIcon className="h-5 w-5 md:hidden"/>
            {/* <Image  alt='logo' src={MenuIcon} /> */}
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Customers</a>
              <a href="#">Help</a>
              <button onClick={onClick} className="btn btn-primary">
                Sign In
              </button>
              {/* <Button>Get for free</Button> */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
