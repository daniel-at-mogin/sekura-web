import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { ChildItem } from "../items";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  item: ChildItem;
  hasChildren: boolean;
  className?: string;
  isActive?: boolean;
}

export default function NavItem({
  item,
  hasChildren,
  className,
  isActive,
}: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const itemContent = (
    <motion.div
      className={cn(
        "relative my-0.5 flex w-full items-center gap-3 overflow-hidden rounded-md px-3 py-2 transition-all duration-200",
        isCollapsed ? "justify-center px-2" : "",
        isActive && "bg-primary text-background font-medium",
        !isActive && "hover:bg-primary/5",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && !isActive && (
          <motion.div
            layoutId="nav-hover-bg"
            className="pointer-events-none absolute inset-0 rounded-lg bg-primary/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        )}
      </AnimatePresence>

      <span
        className={cn(
          "relative z-10 flex w-full items-center gap-2 rounded-md",
          isCollapsed && "justify-center",
        )}
      >
        {item.icon && (
          <item.icon className={cn("h-4 w-4 shrink-0", item.color ?? "")} />
        )}

        {!isCollapsed && (
          <>
            <span className="font-medium">{item.name}</span>
            {hasChildren && (
              <ChevronRight className="ms-auto h-4 w-4 transition-transform duration-200 group-open/nav:rotate-90" />
            )}
          </>
        )}
      </span>
    </motion.div>
  );

  if (!isCollapsed) {
    return itemContent;
  }

  return (
    <Tooltip>
      <TooltipTrigger className="block w-full">
        <div className="w-full">{itemContent}</div>
      </TooltipTrigger>
      <TooltipContent side="right" align="center">
        {item.name}
      </TooltipContent>
    </Tooltip>
  );
}
