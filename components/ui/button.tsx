import {
  forwardRef,
  type ComponentProps,
  type ReactNode,
} from "react";

/* Типографика кнопки: 16 / 24 / 1% — в макете Lufga Light; пока Manrope 300. Source: https://nextjs.org/docs/app/building-your-application/optimizing/fonts */
const labelClass =
  "font-sans text-base font-light leading-6 tracking-[0.01em] whitespace-nowrap";

/** Текст / иконка+текст — по макету Buttons. */
const sizeStylesDefault = {
  large:
    "min-h-[60px] rounded-[30px] px-[24px] py-[18px] gap-2",
  regular: "min-h-[48px] rounded-[24px] px-5 py-3 gap-2",
  medium: "min-h-10 rounded-[20px] px-4 py-2 gap-2",
  small: "min-h-8 rounded-[20px] px-4 py-1 gap-1",
} as const;

/** Только иконка — IconButtons: квадрат, паддинг, иконка 24×24. */
const sizeStylesIconOnly = {
  large:
    "box-border size-[60px] min-h-0 shrink-0 rounded-[30px] p-[18px]",
  regular:
    "box-border size-[48px] min-h-0 shrink-0 rounded-[24px] p-3",
  medium:
    "box-border size-10 min-h-0 shrink-0 rounded-[20px] p-2",
  small:
    "box-border size-8 min-h-0 shrink-0 rounded-[20px] p-1",
} as const;

const variantStyles = {
  black:
    "bg-button-black text-fonts-white hover:bg-button-black-hover active:bg-button-black-pressed",
  violet:
    "bg-button-violet text-fonts-white hover:bg-button-violet-hover active:bg-button-violet-pressed",
  green:
    "bg-button-green text-fonts-black hover:bg-button-green-hover active:bg-button-green-pressed",
  secondary:
    "border border-black/12 bg-white-primary text-fonts-black hover:bg-black/[0.05] active:bg-black/[0.1]",
  outline:
    "border border-black/18 bg-transparent text-fonts-black hover:bg-black/[0.05] active:bg-black/[0.08]",
  ghost:
    "bg-transparent text-fonts-black hover:bg-black/[0.06] active:bg-black/[0.1]",
} as const;

const disabledStyles =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:!bg-background-fivefold disabled:!text-fonts-grey disabled:!opacity-100 disabled:hover:!bg-background-fivefold disabled:active:!bg-background-fivefold disabled:!border-transparent";

function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={[
        "inline-block size-6 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    />
  );
}

function IconSlot({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-6 shrink-0 items-center justify-center [&>svg]:size-6">
      {children}
    </span>
  );
}

export type ButtonSize = keyof typeof sizeStylesDefault;
export type ButtonVariant = keyof typeof variantStyles;
export type ButtonContentMode = "icon-text" | "text" | "icon";

type Common = Omit<ComponentProps<"button">, "children"> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  className?: string;
};

/** Иконка + текст | только текст | только иконка (нужен aria-label). */
export type ButtonProps = Common &
  (
    | { icon: ReactNode; children: ReactNode; mode?: "icon-text" }
    | { children: ReactNode; icon?: undefined; mode?: "text" }
    | {
        icon: ReactNode;
        children?: undefined;
        "aria-label": string;
        mode?: "icon";
      }
  );

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
  const {
    size = "regular",
    variant = "black",
    loading = false,
    disabled,
    className,
    mode: modeProp,
    icon,
    children,
    type = "button",
    ...rest
  } = props;

  const hasChild =
    children != null &&
    children !== false &&
    children !== true &&
    (typeof children !== "string" || children.trim() !== "");

  const mode: ButtonContentMode =
    modeProp ??
    (icon ? (hasChild ? "icon-text" : "icon") : "text");

  const isIconOnly = mode === "icon";
  const showSpinner = loading;
  const isDisabled = disabled || loading;

  const base =
    "inline-flex items-center justify-center border border-transparent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet";

  const sizeClass = isIconOnly
    ? sizeStylesIconOnly[size]
    : sizeStylesDefault[size];

  const classes = [
    base,
    mode === "text" || mode === "icon-text" ? labelClass : null,
    sizeClass,
    variantStyles[variant],
    disabledStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (() => {
    if (showSpinner) {
      return (
        <>
          <IconSlot>
            <Spinner />
          </IconSlot>
          <span className="sr-only">Загрузка</span>
        </>
      );
    }
    if (mode === "icon-text" && icon) {
      return (
        <>
          <IconSlot>{icon}</IconSlot>
          <span>{children}</span>
        </>
      );
    }
    if (mode === "icon" && icon) {
      return <IconSlot>{icon}</IconSlot>;
    }
    return <span>{children}</span>;
  })();

  return (
    <button
      ref={ref}
      type={type}
      data-icon-only={isIconOnly || undefined}
      disabled={isDisabled}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";
