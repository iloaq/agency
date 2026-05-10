import {
  forwardRef,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";

/* Акцент как у Checkbox (teal). Source: app/globals.css — при желании вынеси в токен */

const accent = "#00c08b";

type Native = Omit<ComponentProps<"input">, "type" | "size">;

export type RadioProps = Native & {
  label?: ReactNode;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, id, disabled, ...props },
  ref,
) {
  const shell = [
    "relative mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
    "border-black/25 bg-transparent",
    "group-hover:border-[color:var(--radio-accent)] peer-disabled:group-hover:border-black/15",
    "peer-checked:border-[color:var(--radio-accent)] peer-checked:bg-transparent",
    "peer-checked:group-hover:border-[color:var(--radio-accent)] peer-checked:group-hover:bg-[color:var(--radio-accent)]",
    "peer-checked:group-hover:peer-disabled:border-transparent peer-checked:group-hover:peer-disabled:bg-background-fivefold",
    "peer-disabled:pointer-events-none",
    "peer-disabled:border-black/15 peer-disabled:bg-transparent",
    "peer-checked:peer-disabled:border-transparent peer-checked:peer-disabled:bg-background-fivefold",
    "peer-checked:peer-disabled:group-hover:bg-background-fivefold peer-checked:peer-disabled:group-hover:border-transparent",
    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-violet",
  ].join(" ");

  const dot = [
    "pointer-events-none absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--radio-accent)] opacity-0 transition-opacity",
    "peer-checked:opacity-100 peer-checked:group-hover:opacity-0",
    "peer-disabled:peer-checked:opacity-100 peer-disabled:peer-checked:bg-fonts-grey",
    "peer-disabled:peer-checked:group-hover:!opacity-100",
  ].join(" ");

  return (
    <label
      className={[
        "group inline-flex max-w-full cursor-pointer items-start gap-2 has-[:disabled]:cursor-not-allowed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--radio-accent": accent } as CSSProperties}
    >
      <input
        ref={ref}
        id={id}
        type="radio"
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />
      <span className={shell} aria-hidden>
        <span className={dot} />
      </span>
      {label != null && label !== false ? (
        <span
          className={[
            "min-w-0 flex-1 text-sm font-medium leading-5 text-fonts-black",
            "peer-disabled:text-fonts-grey",
          ].join(" ")}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
});

Radio.displayName = "Radio";
