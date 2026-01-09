import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }) => (
  <nav className={cn("flex justify-center", className)} {...props} />
)

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
))

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))

const PaginationLink = ({ className, isActive, size = "icon", ...props }) => (
  <a
    className={cn(
      buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
      className
    )}
    {...props}
  />
)

const PaginationPrevious = (props) => (
  <PaginationLink size="default" {...props}>
    <ChevronLeft className="h-4 w-4" /> Previous
  </PaginationLink>
)

const PaginationNext = (props) => (
  <PaginationLink size="default" {...props}>
    Next <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)

const PaginationEllipsis = ({ className }) => (
  <span className={cn("flex h-9 w-9 items-center justify-center", className)}>
    <MoreHorizontal className="h-4 w-4" />
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
