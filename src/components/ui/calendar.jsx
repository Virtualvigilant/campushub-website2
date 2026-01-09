import * as React from "react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem]",
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row"),
        month: cn("flex w-full flex-col gap-4"),
        nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between"),
        button_previous: cn(buttonVariants({ variant: buttonVariant })),
        button_next: cn(buttonVariants({ variant: buttonVariant })),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className }) => {
          if (orientation === "left") return <ChevronLeftIcon className={cn("size-4", className)} />
          if (orientation === "right") return <ChevronRightIcon className={cn("size-4", className)} />
          return <ChevronDownIcon className={cn("size-4", className)} />
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({ className, day, modifiers, ...props }) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={className}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
