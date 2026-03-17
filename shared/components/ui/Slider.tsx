// Interactive Slider component with animations and scroll effect
// Source: https://www.framer.com/motion/

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { SliderArrows } from './SliderArrows';
import { Container } from './Container';
import type { SliderSlide, AnimatedElement } from '@/types/slider';

type SliderProps = {
  slides: SliderSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
};

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  slideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  slideRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

function AnimatedElementComponent({ element }: { element: AnimatedElement }) {
  const variant = animationVariants[element.animation_type] || animationVariants.fadeIn;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${element.position_x}%`,
        top: `${element.position_y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{
        duration: 0.6,
        delay: element.animation_delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {element.type === 'text' && (
        <span className="text-sm font-medium" style={{ color: 'var(--current-scheme-text)' }}>
          {element.content}
        </span>
      )}
      {element.type === 'icon' && (
        <div className="text-2xl">{element.content}</div>
      )}
      {element.type === 'image' && (
        <img src={element.content} alt="" className="w-16 h-16 object-cover rounded" />
      )}
      {element.type === 'shape' && (
        <div
          className="w-8 h-8 rounded"
          style={{ backgroundColor: element.content }}
        />
      )}
    </motion.div>
  );
}

// Animated abstract background
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--color-Cerulean) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--color-Bright-Turquoise) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--color-Cerulean) 0%, var(--color-Bright-Turquoise) 50%, transparent 70%)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// Rotating center element
function RotatingCenterElement() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="w-32 h-32 rounded-full border-2"
        style={{
          borderColor: 'var(--current-scheme-accent)',
          borderStyle: 'dashed',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.div
          className="absolute inset-4 rounded-full border-2"
          style={{
            borderColor: 'var(--current-scheme-accent)',
            borderStyle: 'dashed',
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </div>
  );
}

export function Slider({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sliderRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.8, 0.7]);

  const currentSlide = slides[currentIndex];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  // Fullscreen on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView && rect.top < 100) {
          setIsFullscreen(true);
        } else {
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentSlide) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <>
      {/* Original slider */}
      <motion.div
        ref={sliderRef}
        className={cn('relative w-full aspect-video rounded-lg overflow-hidden', className)}
        style={{
          scale,
          opacity,
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
            style={{
              backgroundColor: currentSlide.background_color || 'var(--current-scheme-foreground)',
              backgroundImage: currentSlide.background_image
                ? `url(${currentSlide.background_image})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <AnimatedBackground />
            <RotatingCenterElement />

            {/* Animated Elements */}
            {currentSlide.animated_elements?.map((element) => (
              <AnimatedElementComponent key={element.id} element={element} />
            ))}

            {/* Slide Content */}
            <div className="relative z-10 h-full flex items-center">
              <Container size="full" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left: Title */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center"
                >
                  <h2
                    className="heading-display"
                    style={{ color: currentSlide.text_color || 'var(--current-scheme-text)' }}
                  >
                    {currentSlide.title}
                  </h2>
                </motion.div>

                {/* Right: Description + Button */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col justify-center space-y-6"
                >
                  {currentSlide.description && (
                    <p
                      className="text-large"
                      style={{ color: currentSlide.text_color || 'var(--current-scheme-text)' }}
                    >
                      {currentSlide.description}
                    </p>
                  )}

                  {currentSlide.button_text && (
                    <a
                      href={currentSlide.button_link || '#'}
                      className="inline-block px-6 py-3 rounded-lg font-medium transition-colors w-fit"
                      style={{
                        backgroundColor: 'var(--current-scheme-accent)',
                        color: 'var(--current-scheme-background)',
                      }}
                    >
                      {currentSlide.button_text}
                    </a>
                  )}
                </motion.div>
              </Container>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {slides.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-8 bg-[var(--current-scheme-accent)]'
                      : 'bg-[var(--current-scheme-border)] hover:bg-[var(--current-scheme-accent)]/50'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
              <SliderArrows onPrev={prevSlide} onNext={nextSlide} />
            </div>
          </>
        )}
      </motion.div>

      {/* Fullscreen overlay on scroll */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: currentSlide.background_color || 'var(--current-scheme-foreground)',
              backgroundImage: currentSlide.background_image
                ? `url(${currentSlide.background_image})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <AnimatedBackground />
            <RotatingCenterElement />

            {/* Animated Elements */}
            {currentSlide.animated_elements?.map((element) => (
              <AnimatedElementComponent key={element.id} element={element} />
            ))}

            {/* Fullscreen Content */}
            <div className="relative z-10 h-full flex items-center">
              <Container size="full" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left: Title */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center"
                >
                  <h2
                    className="heading-display"
                    style={{ color: currentSlide.text_color || 'var(--current-scheme-text)' }}
                  >
                    {currentSlide.title}
                  </h2>
                </motion.div>

                {/* Right: Description + Button */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col justify-center space-y-6"
                >
                  {currentSlide.description && (
                    <p
                      className="text-large"
                      style={{ color: currentSlide.text_color || 'var(--current-scheme-text)' }}
                    >
                      {currentSlide.description}
                    </p>
                  )}

                  {currentSlide.button_text && (
                    <a
                      href={currentSlide.button_link || '#'}
                      className="inline-block px-6 py-3 rounded-lg font-medium transition-colors w-fit"
                      style={{
                        backgroundColor: 'var(--current-scheme-accent)',
                        color: 'var(--current-scheme-background)',
                      }}
                    >
                      {currentSlide.button_text}
                    </a>
                  )}
                </motion.div>
              </Container>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'var(--current-scheme-background)',
                color: 'var(--current-scheme-text)',
              }}
              aria-label="Close fullscreen"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Navigation in fullscreen */}
            {slides.length > 1 && (
              <>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all',
                        index === currentIndex
                          ? 'w-8 bg-[var(--current-scheme-accent)]'
                          : 'bg-[var(--current-scheme-border)] hover:bg-[var(--current-scheme-accent)]/50'
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
                  <SliderArrows onPrev={prevSlide} onNext={nextSlide} />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
