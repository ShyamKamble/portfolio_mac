interface MacCalendarIconProps {
size?: number;
className?: string;
day?: number;
}

export const MacCalendarIcon = ({ size = 64, className, day = 24 }: MacCalendarIconProps) => {
return (
<svg
width={size}
height={size}
viewBox="0 0 64 64"
fill="none"
xmlns="http://www.w3.org/2000/svg"
className={className}
>
<defs>
{/* White background gradient */}
<linearGradient id="calendarBg" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#FFFFFF" />
<stop offset="100%" stopColor="#E8E8E8" />
</linearGradient>
{/* Red header gradient */}
<linearGradient id="calendarRed" x1="32" y1="4" x2="32" y2="22" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#FF5A52" />
<stop offset="50%" stopColor="#E8453D" />
<stop offset="100%" stopColor="#D63B33" />
</linearGradient>
<filter id="calendarShadow" x="-10%" y="-10%" width="120%" height="130%">
<feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
</filter>
</defs>
{/* Background rounded square */}
<rect
x="4"
y="4"
width="56"
height="56"
rx="12"
fill="url(#calendarBg)"
filter="url(#calendarShadow)"
/>
{/* Red header */}
<path
d="M4 16 C4 9 9 4 16 4 L48 4 C55 4 60 9 60 16 L60 20 L4 20 Z"
fill="url(#calendarRed)"
/>
{/* Header highlight */}
<path
d="M5 16 C5 10 10 5 16 5 L48 5 C54 5 59 10 59 16 L59 12 C59 10 54 5 48 5 L16 5 C10 5 5 10 5 12 Z"
fill="#FF7A74"
opacity="0.6"
/>
{/* Day name */}
<text
x="32"
y="15"
textAnchor="middle"
fill="#FFFFFF"
fontSize="8"
fontWeight="600"
fontFamily="system-ui, -apple-system, sans-serif"
>
THURSDAY
</text>
{/* Day number */}
<text
x="32"
y="48"
textAnchor="middle"
fill="#333333"
fontSize="28"
fontWeight="300"
fontFamily="system-ui, -apple-system, sans-serif"
>
{day}
</text>
{/* Binding rings */}
<rect x="18" y="1" width="4" height="6" rx="1" fill="#C0C0C0" />
<rect x="42" y="1" width="4" height="6" rx="1" fill="#C0C0C0" />
<rect x="18" y="2" width="4" height="2" rx="0.5" fill="#E0E0E0" />
<rect x="42" y="2" width="4" height="2" rx="0.5" fill="#E0E0E0" />
</svg>
);
};