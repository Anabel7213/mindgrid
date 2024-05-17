import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";
import EmojiPicker, { Theme } from "emoji-picker-react";

interface IconPicker {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

export default function IconPicker({
  onChange,
  children,
  asChild,
}: IconPicker) {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };
  const theme = themeMap[currentTheme];
  return (
    <>
      <Popover>
        <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
        <PopoverContent className="shadow-none border-0 bg-transparent overflow-visible">
          <EmojiPicker
            theme={theme}
            height={350}
            onEmojiClick={(data) => onChange(data.emoji)}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
