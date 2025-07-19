'use client'

import { useState } from 'react'
import clsx from 'clsx'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(false)

  return (
    <div className="scale-50 text-white absolute top-2 left-2">
      <input
        id="dn"
        type="checkbox"
        className="sr-only"
        checked={theme}
        onChange={() => setTheme(!theme)}
      />
      <label
        htmlFor="dn"
        className={clsx(
          'relative inline-block h-[50px] w-[90px] cursor-pointer rounded-full transition-colors duration-200',
          theme ? 'bg-[#749dd6]' : 'bg-[#83d8ff]'
        )}
      >


        <span
          className={clsx(
            'absolute left-[3px] top-[3px] z-10 h-[44px] w-[44px] rounded-full bg-[#ffcf96] shadow-md transition-all duration-500',
            theme &&
              'translate-x-[40px] transform bg-[#ffe5b5] rotate-0'
          )}
        >
          <span className={clsx(
            'absolute left-[10px] top-[18px] h-[4px] w-[4px] rounded-full bg-[#e8cda5] opacity-0 transition-opacity',
            theme && 'opacity-100'
          )} />
          <span className={clsx(
            'absolute left-[22px] top-[28px] h-[6px] w-[6px] rounded-full bg-[#e8cda5] opacity-0 transition-opacity',
            theme && 'opacity-100'
          )} />
          <span className={clsx(
            'absolute left-[25px] top-[10px] h-[8px] w-[8px] rounded-full bg-[#e8cda5] opacity-0 transition-opacity',
            theme && 'opacity-100'
          )} />
        </span>

        {/* Stars */}
        <span className={clsx(
          'absolute left-[35px] top-[10px] z-0 rounded-full bg-white transition-all',
          theme ? 'h-[2px] w-[2px]' : 'h-[3px] w-[30px]'
        )} />
        <span className={clsx(
          'absolute left-[28px] top-[18px] z-10 rounded-full bg-white transition-all',
          theme ? 'h-[4px] w-[4px] -translate-x-[5px]' : 'h-[3px] w-[30px]'
        )} />
        <span className={clsx(
          'absolute left-[40px] top-[27px] z-0 rounded-full bg-white transition-all',
          theme ? 'h-[2px] w-[2px] -translate-x-[7px]' : 'h-[3px] w-[30px]'
        )} />

        {/* Hidden Stars */}
        <span className={clsx(
          'absolute left-[11px] top-[16px] z-0 h-[2px] w-[2px] rounded-full bg-white transition-all',
          theme ? 'opacity-100 translate-x-0 delay-[200ms]' : 'opacity-0 translate-x-[3px]'
        )} />
        <span className={clsx(
          'absolute left-[17px] top-[32px] z-0 h-[3px] w-[3px] rounded-full bg-white transition-all',
          theme ? 'opacity-100 translate-x-0 delay-[300ms]' : 'opacity-0 translate-x-[3px]'
        )} />
        <span className={clsx(
          'absolute left-[28px] top-[36px] z-0 h-[2px] w-[2px] rounded-full bg-white transition-all',
          theme ? 'opacity-100 translate-x-0 delay-[400ms]' : 'opacity-0 translate-x-[3px]'
        )} />
      </label>
    </div>
  )
}
