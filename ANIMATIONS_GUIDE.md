# Framer Motion Animations Guide

## Overview

Three reusable animation components are available:

1. **ScrollReveal** - Animates elements as they scroll into view
2. **FadeIn** - Simple fade-in animation
3. **StaggerContainer** - Staggered animation for multiple items

---

## Components

### 1. ScrollReveal

Animates elements when they enter the viewport.

**Usage:**

```tsx
import { ScrollReveal } from '@/components/animations'

export function Example() {
  return (
    <ScrollReveal delay={0.1} direction="up">
      <h1>This text fades in when scrolled to</h1>
    </ScrollReveal>
  )
}
```

**Props:**

```typescript
interface ScrollRevealProps {
  children: ReactNode
  delay?: number              // Default: 0 (seconds)
  duration?: number           // Default: 0.6 (seconds)
  direction?: 'up' | 'down' | 'left' | 'right'  // Default: 'up'
  distance?: number           // Default: 40 (pixels)
}
```

**Example: Product Card Animations**

```tsx
{filtered.map((product, index) => (
  <ScrollReveal 
    key={product.id} 
    delay={index * 0.1}
    direction="up"
  >
    <Card>
      {/* Card content */}
    </Card>
  </ScrollReveal>
))}
```

---

### 2. FadeIn

Simple opacity fade-in animation. Useful for page loads and transitions.

**Usage:**

```tsx
import { FadeIn } from '@/components/animations'

export function Example() {
  return (
    <FadeIn delay={0.2}>
      <img src="hero-image.jpg" alt="Hero" />
    </FadeIn>
  )
}
```

**Props:**

```typescript
interface FadeInProps {
  children: ReactNode
  delay?: number     // Default: 0 (seconds)
  duration?: number  // Default: 0.5 (seconds)
}
```

---

### 3. StaggerContainer

Stagger animations for multiple children with a delay between each.

**Usage:**

```tsx
import { StaggerContainer } from '@/components/animations'

export function ServicesList({ services }) {
  return (
    <StaggerContainer staggerDelay={0.1} delayChildren={0.2}>
      {services.map((service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </StaggerContainer>
  )
}
```

**Props:**

```typescript
interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number   // Default: 0.1 (delay between items)
  delayChildren?: number  // Default: 0 (initial delay)
  duration?: number       // Default: 0.5 (animation duration per item)
}
```

---

## Animation Presets

### Fade Up (Recommended)
```tsx
<ScrollReveal direction="up" distance={40} duration={0.6}>
  {children}
</ScrollReveal>
```

### Fade Left
```tsx
<ScrollReveal direction="left" distance={60} duration={0.7}>
  {children}
</ScrollReveal>
```

### Fade Right
```tsx
<ScrollReveal direction="right" distance={60} duration={0.7}>
  {children}
</ScrollReveal>
```

### Quick Fade
```tsx
<ScrollReveal duration={0.3} distance={20}>
  {children}
</ScrollReveal>
```

### Slow Reveal
```tsx
<ScrollReveal duration={1} delay={0.2}>
  {children}
</ScrollReveal>
```

---

## Real-World Examples

### Hero Section with Animations

```tsx
export function HeroSection() {
  return (
    <section className="hero">
      <FadeIn delay={0}>
        <h1>Solar Solutions for Lahore</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p>Harness the power of the sun</p>
      </FadeIn>
      <FadeIn delay={0.4}>
        <button>Get Started</button>
      </FadeIn>
    </section>
  )
}
```

### Product Grid with Stagger

```tsx
export function ProductsGrid({ products }) {
  return (
    <div className="grid grid-cols-3">
      <StaggerContainer staggerDelay={0.15} delayChildren={0.1}>
        {products.map((product) => (
          <ScrollReveal key={product.id} direction="up">
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </StaggerContainer>
    </div>
  )
}
```

### Features List with Timeline Effect

```tsx
export function Features() {
  return (
    <div className="space-y-8">
      <ScrollReveal direction="left" delay={0}>
        <Feature title="Design" />
      </ScrollReveal>
      <ScrollReveal direction="right" delay={0.1}>
        <Feature title="Build" />
      </ScrollReveal>
      <ScrollReveal direction="left" delay={0.2}>
        <Feature title="Deploy" />
      </ScrollReveal>
    </div>
  )
}
```

### Services with Hover Effects

```tsx
'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations'

export function ServiceCard({ service }) {
  return (
    <ScrollReveal>
      <motion.div
        whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.3 }}
        className="p-6 bg-white rounded-lg"
      >
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </motion.div>
    </ScrollReveal>
  )
}
```

---

## Advanced: Custom Animations with Framer Motion

For more control, use Framer Motion directly:

```tsx
'use client'

import { motion } from 'framer-motion'

export function CustomAnimation() {
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      Custom animated content
    </motion.div>
  )
}
```

---

## Performance Tips

1. **Use `triggerOnce={true}`** - Animations only play once (enabled by default)
2. **Reasonable durations** - Keep animations under 1 second for fast interactions
3. **Reduce motion** - Respect user's prefers-reduced-motion:

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

<ScrollReveal duration={prefersReducedMotion ? 0 : 0.6}>
  {children}
</ScrollReveal>
```

---

## Common Use Cases

| Use Case | Component | Code |
|----------|-----------|------|
| Page load fade-in | FadeIn | `<FadeIn>{content}</FadeIn>` |
| Scroll reveal cards | ScrollReveal | `<ScrollReveal direction="up">{card}</ScrollReveal>` |
| List with stagger | StaggerContainer | `<StaggerContainer>{items}</StaggerContainer>` |
| Hover effect | motion.div | `<motion.div whileHover={{...}}>` |
| Page transition | FadeIn | `<FadeIn>{newPage}</FadeIn>` |
| Count animation | motion.div | `<motion.div initial={0} animate={100}>` |

---

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile Safari iOS 13+
- Requires JS enabled

---

## Resources

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Examples Gallery:** https://www.framer.com/motion/examples/
- **API Reference:** https://www.framer.com/docs/animation/

---

**Next Steps:**

1. ✅ Animation components are ready
2. ⬜ Apply to sections (ProductsSection, ServicesSection, etc.)
3. ⬜ Test on mobile devices
4. ⬜ Monitor performance with DevTools

Start by wrapping key sections with `<ScrollReveal>` for a professional reveal effect as users scroll! 🎬
