"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover",
      className
    )}
    {...props}
  />
))

const CommandDialog = ({ children, ...props }) => (
  <Dialog {...props}>
    <DialogContent className="p-0 overflow-hidden">
      <Command>{children}</Command>
    </DialogContent>
  </Dialog>
)

const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn("h-10 w-full bg-transparent outline-none", className)}
      {...props}
    />
  </div>
))

const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto", className)}
    {...props}
  />
))

const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[selected=true]:bg-accent",
      className
    )}
    {...props}
  />
))

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
}
