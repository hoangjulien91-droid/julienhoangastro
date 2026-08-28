"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const AlertDialogContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({ isOpen: false, setIsOpen: () => {} });

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = (val: boolean) => {
    setInternalOpen(val);
    onOpenChange?.(val);
  };

  return (
    <AlertDialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({ children, className, ...props }: any) {
  const { setIsOpen } = React.useContext(AlertDialogContext);
  return (
    <div onClick={() => setIsOpen(true)} className={cn("inline-block cursor-pointer", className)} {...props}>
      {children}
    </div>
  );
}

export function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function AlertDialogOverlay({ className }: { className?: string }) {
  const { isOpen } = React.useContext(AlertDialogContext);
  if (!isOpen) return null;
  return <div className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-xs", className)} />;
}

export function AlertDialogContent({ children, className, ...props }: any) {
  const { isOpen } = React.useContext(AlertDialogContext);
  if (!isOpen) return null;
  return (
    <>
      <AlertDialogOverlay />
      <div
        className={cn(
          "bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl border border-border p-6 shadow-xl sm:max-w-lg -translate-x-1/2 -translate-y-1/2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

export function AlertDialogHeader({ className, ...props }: any) {
  return <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: any) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}

export function AlertDialogTitle({ className, ...props }: any) {
  return <h3 className={cn("text-lg font-bold font-serif text-foreground", className)} {...props} />;
}

export function AlertDialogDescription({ className, ...props }: any) {
  return <p className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

export function AlertDialogAction({ className, onClick, ...props }: any) {
  const { setIsOpen } = React.useContext(AlertDialogContext);
  return (
    <button
      className={cn(buttonVariants(), className)}
      onClick={(e) => {
        onClick?.(e);
        setIsOpen(false);
      }}
      {...props}
    />
  );
}

export function AlertDialogCancel({ className, onClick, ...props }: any) {
  const { setIsOpen } = React.useContext(AlertDialogContext);
  return (
    <button
      className={cn(buttonVariants({ variant: "outline" }), className)}
      onClick={(e) => {
        onClick?.(e);
        setIsOpen(false);
      }}
      {...props}
    />
  );
}

