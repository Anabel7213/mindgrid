import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BookOpenText, File, Goal } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  const productMenuItems = [
    {
      name: "Docs",
      icon: <File size={20} color="#ee5b27"/>,
      desc: "Simple & powerful",
      onClick: () => {},
    },
    {
      name: "Wikis",
      icon: <BookOpenText size={20} color="#ffcc01" />,
      desc: "Learn a lifetime",
      onClick: () => {},
    },
    {
      name: "Projects",
      icon: <Goal size={20} color="#4f8ff5" />,
      desc: "Achieve more together",
      onClick: () => {},
    },
  ];
  const resourcesMenuItems = [
    "Blog", "Help Center", "Community"
  ]
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col gap-2 p-1 whitespace-nowrap">
              {productMenuItems.map((item, i) => (
                <Link key={i} href={"/"} className="flex gap-1 text-sm p-2 rounded-sm items-center dark:hover:bg-neutral-800 hover:bg-neutral-50 transition-all">
                  <div>
                    <div className="pr-2">{item.icon}</div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-medium">{item.name}</h1>
                    <p className="text-neutral-500 font-normal">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col gap-2 p-1 whitespace-nowrap">
                {resourcesMenuItems.map((item, i) => (
                    <Link key={i} href={"/"} className="flex gap-1 font-medium text-sm p-2 rounded-sm items-center dark:hover:bg-neutral-800 hover:bg-neutral-50 transition-all">{item}</Link>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              Pricing
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
