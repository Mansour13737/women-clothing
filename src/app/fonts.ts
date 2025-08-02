// app/fonts.ts
import localFont from 'next/font/local'

export const cinzel = localFont({
  src: [
    { path: '../../public/fonts/cinzel/Cinzel-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/cinzel/Cinzel-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/cinzel/Cinzel-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/cinzel/Cinzel-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/cinzel/Cinzel-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: '../../public/fonts/cinzel/Cinzel-Black.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-cinzel',
  display: 'swap',
})