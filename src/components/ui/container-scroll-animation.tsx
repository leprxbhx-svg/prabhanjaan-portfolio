"use client";
import React from "react";

// Works section is now rendered statically — no scroll-linked scale/rotate
// choreography, no tall "scroll mattress", no oversized card chrome. The
// title block and the works grid flow in order, plain and neat, on every
// device. (Kept the container-scroll name/API so the App markup is stable.)
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="w-full relative py-2">
    <div className="max-w-5xl mx-auto text-center">{titleComponent}</div>
    <div className="max-w-5xl mx-auto">{children}</div>
  </div>
);