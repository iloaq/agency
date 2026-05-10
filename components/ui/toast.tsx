"use client";

import { Action, Provider, Root, Title, Viewport } from "@radix-ui/react-toast";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* Source: https://www.radix-ui.com/primitives/docs/components/toast */

const NEUTRAL_BG = "#ffffff";

export type ToastVariant = "neutral" | "success";
export type ToastShape = "rounded" | "pill";

export type ToastPayload = {
  title: ReactNode;
  variant?: ToastVariant;
  shape?: ToastShape;
  actionLabel?: string;
  onAction?: () => void;
  /** altText для ToastAction (a11y), по умолчанию = actionLabel */
  actionAltText?: string;
  duration?: number;
};

type ToastRecord = ToastPayload & { id: string; open: boolean };

type ToastContextValue = {
  toast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast должен вызываться внутри ToastProvider");
  }
  return ctx;
}

let toastIdSeq = 0;
function nextId() {
  toastIdSeq += 1;
  return `toast-${toastIdSeq}`;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      className={["shrink-0 text-current", className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 10l2.5 2.5L14 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const shells: Record<ToastVariant, string> = {
  neutral: "text-fonts-black shadow-lg",
  success: "bg-charts-green-data text-white shadow-lg",
};

const shapes: Record<ToastShape, string> = {
  rounded: "rounded-lg",
  pill: "rounded-full",
};

export function ToastProvider({
  children,
  duration = 5000,
  label = "Уведомления",
  ...props
}: React.ComponentProps<typeof Provider>) {
  const [items, setItems] = useState<ToastRecord[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((payload: ToastPayload) => {
    const id = nextId();
    const record: ToastRecord = {
      ...payload,
      id,
      open: true,
      variant: payload.variant ?? "neutral",
      shape: payload.shape ?? "rounded",
    };
    setItems((prev) => [...prev, record]);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <Provider duration={duration} label={label} {...props}>
      <ToastContext.Provider value={value}>
        {children}
        {items.map((t) => {
          const v = t.variant ?? "neutral";
          const s = t.shape ?? "rounded";
          const actionAlt = t.actionAltText ?? t.actionLabel ?? "Действие";
          return (
            <Root
              key={t.id}
              open={t.open}
              duration={t.duration ?? duration}
              onOpenChange={(open) => {
                if (!open) remove(t.id);
              }}
              className={[
                "pointer-events-auto flex w-full max-w-md items-center gap-3 px-4 py-3",
                shells[v],
                shapes[s],
                v === "neutral" ? "border border-black/10" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                v === "neutral" ? { backgroundColor: NEUTRAL_BG } : undefined
              }
            >
              <CheckIcon />
              <Title className="min-w-0 flex-1 text-sm font-normal leading-5">
                {t.title}
              </Title>
              {t.actionLabel && t.onAction ? (
                <Action
                  altText={actionAlt}
                  onClick={(e) => {
                    e.preventDefault();
                    t.onAction?.();
                  }}
                  className={[
                    "shrink-0 rounded-md text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                    v === "neutral"
                      ? "bg-transparent px-2 py-1 text-fonts-black underline decoration-black/35 underline-offset-2 hover:decoration-fonts-black"
                      : "rounded-full bg-white px-3 py-1.5 text-black-primary hover:bg-white/90",
                  ].join(" ")}
                >
                  {t.actionLabel}
                </Action>
              ) : null}
            </Root>
          );
        })}
        <Viewport
          label="Уведомления"
          className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-4 sm:right-4 sm:top-auto sm:flex-col md:max-w-[420px]"
        />
      </ToastContext.Provider>
    </Provider>
  );
}
