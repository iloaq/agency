// Slider slide types for Directus

export type SliderSlide = {
  id: string;
  title: string;
  description?: string;
  background_image?: string;
  background_color?: string;
  text_color?: string;
  button_text?: string;
  button_link?: string;
  animated_elements?: AnimatedElement[];
  order?: number;
  status: 'published' | 'draft';
};

export type AnimatedElement = {
  id: string;
  type: 'text' | 'icon' | 'image' | 'shape';
  content: string;
  position_x: number; // percentage
  position_y: number; // percentage
  animation_delay: number; // seconds
  animation_type: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
};
