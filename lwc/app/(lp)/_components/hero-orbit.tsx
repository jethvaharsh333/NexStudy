import { IconBadge } from "@/components/icon-badge";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const HeroOrbit = ({ children, size } : PropsWithChildren<{size: number}>) => {
    return(
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
          {/* <div className="animate-spin [animation-duration:30s]"> */}
          <div className="rotate-6" style={{
            height: `${size}px`,
            width: `${size}px`
          }}>
            <div className="inline-flex animate-spin [animation-duration:25s]">
              {children}
            </div>
          </div>
        </div>
    );
}