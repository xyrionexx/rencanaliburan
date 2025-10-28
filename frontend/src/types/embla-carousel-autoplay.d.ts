declare module 'embla-carousel-autoplay' {
  interface AutoplayOptions {
    delay?: number;
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
    playOnInit?: boolean;
  }
  
  export default function Autoplay(options?: AutoplayOptions): any;
}
