import {
  forwardRef,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";

/* Акцент чекбокса из макета (teal). Токены палитры: app/globals.css */

const accent = "#00c08b";

type Native = Omit<ComponentProps<"input">, "type" | "size">;

export type CheckboxProps = Native & {
  label?: ReactNode;
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={["pointer-events-none opacity-0", className]
        .filter(Boolean)
        .join(" ")}
      width={12}
      height={12}
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, label, id, disabled, ...props }, ref) {
    const box = [
      "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors",
      "border-black/25 bg-transparent text-fonts-black",
      "group-hover:border-[color:var(--checkbox-accent)]",
      "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-violet",
      "peer-checked:border-[color:var(--checkbox-accent)] peer-checked:bg-[color:var(--checkbox-accent)] peer-checked:text-white",
      "peer-checked:group-hover:border-[color:var(--checkbox-accent)]",
      "peer-disabled:pointer-events-none peer-disabled:border-transparent peer-disabled:bg-background-fivefold",
      "peer-disabled:group-hover:border-transparent",
      "peer-disabled:peer-checked:bg-background-fivefold",
      "peer-checked:[&>svg]:opacity-100",
      "peer-disabled:peer-checked:[&>svg]:text-fonts-grey",
    ].join(" ");

    return (
      <label
        className={[
          "group inline-flex max-w-full cursor-pointer items-start gap-2 has-[:disabled]:cursor-not-allowed",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ "--checkbox-accent": accent } as CSSProperties}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span className={box} aria-hidden>
          <CheckIcon />
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
  },
);

Checkbox.displayName = "Checkbox";
