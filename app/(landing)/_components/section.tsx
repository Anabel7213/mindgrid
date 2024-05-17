"use client";

import Image from "next/image";
import { useState } from "react";

export default function Section() {
  const items = [
    {
      name: "Innovate",
      image: "/landing/idea.png",
    },
    {
      name: "Achieve",
      image: "/landing/aim.png",
    },
    {
      name: "Check off",
      image: "/landing/tasks.png",
    },
    {
      name: "Track",
      image: "/landing/track.png",
    },
    {
      name: "Organize",
      image: "/landing/organize.png",
    },
  ];
  const [active, setActive] = useState(0);
  const photos = [
    {
      id: 0,
      link: "/landing/demo/desktop_1.jpg",
    },
    {
      id: 1,
      link: "/landing/demo/desktop_2.jpg",
    },
    {
      id: 2,
      link: "/landing/demo/desktop_4.jpg",
    },
    {
      id: 3,
      link: "/landing/demo/desktop_6.png",
    },
    {
      id: 4,
      link: "/landing/demo/desktop_7.png",
    },
  ];
  return (
    <>
      <div className="mx-4 md:mx-auto">
        <div className="flex flex-col gap-4">
          {/* <h1 className="font-bold text-3xl capitalize">We got something for everyone</h1>
                <h2 className="text-xl text-neutral-500">Mindgrid&#39;s powerful tools help you stay organized across all domains of life.</h2> */}
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div
                  onClick={() => setActive(i)}
                  className={`${active === i && "lg:border lg:dark:border-neutral-800 lg:border-neutral-200 lg:dark:dark:bg-black lg:bg-transparent"} border border-transparent hover:border w-full lg:w-fit dark:hover:border-neutral-800 hover:border-neutral-200 flex flex-row lg:flex-col gap-2 justify-center items-center rounded-lg py-4 px-4 lg:px-8 dark:bg-neutral-900 bg-neutral-50 transition-all`}
                >
                  <Image
                    src={item.image}
                    alt="Image"
                    width={100}
                    height={100}
                    className="object-contain w-[100px] h-[100px]"
                  />
                  <h1 className="font-semibold text-lg">{item.name}</h1>
                </div>
                <div className="lg:hidden w-full">
                  <div className="p-0 lg:p-8 dark:bg-neutral-900 bg-neutral-50 rounded-lg">
                    {photos
                      .filter((photo) => photo.id === i)
                      .map((photo) => (
                        <Image
                          key={photo.id}
                          src={photo.link}
                          width={800}
                          height={300}
                          alt="Demo"
                          className="max-w-[832px] border w-full h-auto rounded-lg object-cover"
                        />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block p-8 dark:bg-neutral-900 bg-neutral-50 rounded-lg lg:h-[532px] w-full">
            {photos
              .filter((photo) => photo.id === active)
              .map((photo) => (
                <Image
                  key={photo.id}
                  src={photo.link}
                  width={800}
                  height={300}
                  alt="Demo"
                  className="max-w-[832px] border w-full h-auto rounded-lg object-cover"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
