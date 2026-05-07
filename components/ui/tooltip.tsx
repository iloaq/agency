"use client";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";
import {
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/* Source: https://www.radix-ui.com/primitives/docs/components/tooltip */

const TOOLTIP_BG = "#1a1a1a";

const panelClass =
  "agency-tooltip-panel z-50 max-w-sm rounded-md px-3 py-2 text-left text-xs font-normal leading-4 text-white shadow-lg";

export function TooltipProvider({
  children,
  delayDuration = 300,
  skipDelayDuration = 300,
  ...props
}: React.ComponentProps<typeof Provider>) {
  return (
    <Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    >
      {children}
    </Provider>
  );
}

export type SimpleTooltipProps = {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  /** Показать стрелку к триггеру */
  showArrow?: boolean;
  /** Задержка до открытия (мс) */
  delayDuration?: number;
  className?: string;
  contentClassName?: string;
};

/** Тултип по hover (иконка копирования, подсказки и т.д.). */
export function SimpleTooltip({
  content,
  children,
  side = "top",
  showArrow = true,
  delayDuration = 300,
  className,
  contentClassName,
}: SimpleTooltipProps) {
  return (
    <Root delayDuration={delayDuration}>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Content
          side={side}
          sideOffset={8}
          className={[panelClass, contentClassName, className]
            .filter(Boolean)
            .join(" ")}
          style={{ backgroundColor: TOOLTIP_BG }}
        >
          {content}
          {showArrow ? (
            <Arrow
              className="fill-[#1a1a1a]"
              width={10}
              height={5}
              aria-hidden
            />
          ) : null}
        </Content>
      </Portal>
    </Root>
  );
}

export type TruncatedTooltipProps = Omit<SimpleTooltipProps, "content"> & {
  /** Полный текст (например полный кошелёк) */
  content: ReactNode;
  children: ReactElement;
};

/**
 * Тултип только если дочерний элемент обрезан (scrollWidth > clientWidth).
 * Требуется `TooltipProvider` в корне (см. app/layout.tsx).
 */
export function TruncatedTooltip({
  content,
  children,
  ...rest
}: TruncatedTooltipProps) {
  const measureRef = useRef<HTMLElement>(null);
  const [truncated, setTruncated] = useState(false);
  const childRef = isValidElement(children)
    ? (children as ReactElement & { ref?: React.Ref<HTMLElement> }).ref
    : undefined;
  const mergedRef = useComposedRefs(measureRef, childRef);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const check = () => setTruncated(el.scrollWidth > el.clientWidth + 1);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    check();
    return () => ro.disconnect();
  }, [children]);

  if (!isValidElement(children)) {
    return children as ReactNode;
  }

  const trigger = cloneElement(children, { ref: mergedRef } as never);

  if (!truncated) {
    return trigger;
  }

  return <SimpleTooltip content={content} {...rest}>{trigger}</SimpleTooltip>;
}
