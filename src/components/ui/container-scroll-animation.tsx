"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

// On phones and small tablets the scroll-linked scale/rotate choreography is
// pure jank: it continuously transforms a container that holds several videos,
// forcing the GPU to re-rasterize them on every scroll frame, and it reserves
// a tall scroll "mattress" that feels wrong on a small screen. So on small
// screens we render the section statically (same look, zero scroll work) and
// keep the fancy animation only on desktop.
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  });
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <MobileWorks titleComponent={titleComponent}>{children}</MobileWorks>;
  }
  return <DesktopWorks titleComponent={titleComponent}>{children}</DesktopWorks>;
};

const MobileWorks = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="w-full px-3 py-8 relative">
    <div className="max-w-5xl mx-auto text-center">{titleComponent}</div>
    <div className="mt-6 max-w-5xl mx-auto w-full rounded-[30px] border border-white/15 bg-[rgba(255,255,255,0.07)] shadow-2xl p-2 overflow-hidden">
      <div className="w-full overflow-hidden rounded-2xl bg-[rgba(12,12,16,0.5)]">
        {children}
      </div>
    </div>
  </div>
);

const DesktopWorks = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-32 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[50rem] w-full border border-white/15 p-2 md:p-6 bg-[rgba(255,255,255,0.07)] backdrop-blur-2xl rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-[rgba(12,12,16,0.5)] md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};