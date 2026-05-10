import {
  forwardRef,
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";

/* Source: https://react.dev/reference/react/useId — связка label/input */

export type InputSize = "large" | "regular" | "medium" | "small";
export type InputSegment = "default" | "group-first" | "group-mid" | "group-last";

const fieldShell = {
  default:
    "rounded-xl border border-black/10 bg-background-secondary",
  "group-first":
    "rounded-none border-0 border-b border-b-black/10 bg-background-secondary",
  "group-mid":
    "rounded-none border-0 border-b border-b-black/10 bg-background-secondary",
  "group-last":
    "rounded-none border-0 bg-background-secondary",
} as const;

const sizeConfig = {
  large: {
    row: "min-h-[56px] h-[56px] gap-2 px-4 text-base leading-6",
    input: "py-0",
    hit: "size-8 [&>svg]:size-6",
  },
  regular: {
    row: "min-h-12 h-12 gap-2 px-4 text-base leading-6",
    input: "py-0",
    hit: "size-8 [&>svg]:size-6",
  },
  medium: {
    row: "min-h-10 h-10 gap-1 px-4 text-sm leading-5",
    input: "py-0",
    hit: "size-8 [&>svg]:size-6",
  },
  small: {
    row: "min-h-8 h-8 gap-1 px-3 text-sm leading-5",
    input: "py-0",
    hit: "size-8 [&>svg]:size-5",
  },
} as const;

const stateShell =
  "transition-colors hover:bg-background-tertiary focus-within:bg-background-tertiary";

type Native = Omit<ComponentProps<"input">, "size">;

export type InputProps = Native & {
  size?: InputSize;
  label?: ReactNode;
  caption?: ReactNode;
  error?: ReactNode;
  /** Зелёная обводка (успех / активное по макету). */
  success?: boolean;
  /** Нейтральная плотная обводка (заполненное поле, чёрная/светлая на тёмном). */
  neutralBorder?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  /** Кнопка «очистить» справа; показывается при непустом controlled `value`. */
  clearable?: boolean;
  onClear?: () => void;
  /** Склейка полей: внешний контейнер — `InputGroup`, внутри 0px между соседями. */
  segment?: InputSegment;
  inputClassName?: string;
};

function ClearIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M6 6l4 4M10 6L6 10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function InputField(
  {
    size = "regular",
    label,
    caption,
    error,
    success,
    neutralBorder,
    leftSlot,
    rightSlot,
    clearable,
    onClear,
    value,
    segment = "default",
    className,
    inputClassName,
    disabled,
    id: idProp,
    ...props
  },
  ref,
) {
  const uid = useId();
  const id = idProp ?? uid;
  const hintId = `${id}-hint`;
  const hasHint = Boolean(caption || error);
  const err = Boolean(error);

  const showClear =
    Boolean(clearable && onClear && !disabled) &&
    typeof value === "string" &&
    value.length > 0;

  const borderTone = err
    ? "border-system-error focus-within:border-system-error"
    : success
      ? "border-charts-green-data focus-within:border-charts-green-data"
      : neutralBorder
        ? "border-black/55 focus-within:border-fonts-black"
        : "border-black/10 hover:border-black/20 focus-within:border-charts-green-data";

  const shell = [
    "flex items-stretch",
    sizeConfig[size].row,
    stateShell,
    fieldShell[segment],
    segment === "default" ? borderTone : "",
    err && segment !== "default" ? "border-b-system-error" : "",
    disabled &&
      "pointer-events-none border-transparent bg-background-fivefold opacity-100",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex w-full flex-col gap-3">
      {label != null && label !== "" && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-5 text-fonts-grey"
        >
          {label}
        </label>
      )}
      <div className={shell}>
        {leftSlot ? (
          <span
            className={[
              "inline-flex shrink-0 items-center justify-center text-icons-grey",
              sizeConfig[size].hit,
            ].join(" ")}
          >
            {leftSlot}
          </span>
        ) : null}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          value={value}
          aria-invalid={err || undefined}
          aria-describedby={hasHint ? hintId : undefined}
          className={[
            "min-w-0 flex-1 bg-transparent outline-none placeholder:text-fonts-grey disabled:cursor-not-allowed",
            err ? "text-fonts-grey" : "text-fonts-black",
            "disabled:text-fonts-grey/90",
            sizeConfig[size].input,
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {showClear ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Очистить"
            onClick={(e) => {
              e.preventDefault();
              onClear?.();
            }}
            className={[
              "inline-flex shrink-0 items-center justify-center text-icons-grey transition-colors hover:text-fonts-black",
              sizeConfig[size].hit,
            ].join(" ")}
          >
            <ClearIcon />
          </button>
        ) : null}
        {rightSlot ? (
          <span
            className={[
              "inline-flex shrink-0 items-center justify-center text-icons-grey",
              sizeConfig[size].hit,
            ].join(" ")}
          >
            {rightSlot}
          </span>
        ) : null}
      </div>
      {hasHint ? (
        <p
          id={hintId}
          className={[
            "text-sm leading-5",
            err ? "text-fonts-error" : "text-fonts-grey",
          ].join(" ")}
        >
          {error ?? caption}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";

/** Внешний блок 12px + clip: соседние `Input` с `segment` first/mid/last и разделитель. */
export function InputGroup({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-xl border border-black/10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
