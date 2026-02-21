interface MacMailIconProps {
size?: number;
className?: string;
}

export const MacMailIcon = ({ size = 64, className }: MacMailIconProps) => {
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
{/* Sky gradient background */}
<linearGradient id="mailBg" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#5BC5F2" />
<stop offset="50%" stopColor="#3AAEE0" />
<stop offset="100%" stopColor="#1E90D0" />
</linearGradient>
{/* Envelope body gradient */}
<linearGradient id="envelopeBody" x1="32" y1="18" x2="32" y2="48" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#FFFFFF" />
<stop offset="100%" stopColor="#E8E8E8" />
</linearGradient>
{/* Envelope flap gradient */}
<linearGradient id="envelopeFlap" x1="32" y1="18" x2="32" y2="32" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#F5F5F5" />
<stop offset="100%" stopColor="#DDDDDD" />
</linearGradient>
<filter id="mailShadow" x="-10%" y="-10%" width="120%" height="130%">
<feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
</filter>
<filter id="envelopeShadow" x="-10%" y="-10%" width="120%" height="130%">
<feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.15" />
</filter>
</defs>
{/* Background rounded square */}
<rect
x="4"
y="4"
width="56"
height="56"
rx="12"
fill="url(#mailBg)"
filter="url(#mailShadow)"
/>
{/* Inner highlight */}
<rect
x="5"
y="5"
width="54"
height="27"
rx="11"
fill="#6DD0F8"
opacity="0.4"
/>
{/* Envelope body */}
<rect
x="10"
y="20"
width="44"
height="28"
rx="3"
fill="url(#envelopeBody)"
filter="url(#envelopeShadow)"
/>
{/* Envelope flap (triangle) */}
<path
d="M10 23 L32 38 L54 23 L54 20 C54 18.5 52.5 17 51 17 L13 17 C11.5 17 10 18.5 10 20 Z"
fill="url(#envelopeFlap)"
/>
{/* Flap fold line */}
<path
d="M10 23 L32 38 L54 23"
fill="none"
stroke="#CCCCCC"
strokeWidth="0.5"
/>
{/* Bottom envelope fold */}
<path
d="M10 45 L26 34 M54 45 L38 34"
fill="none"
stroke="#D0D0D0"
strokeWidth="0.5"
/>
</svg>
);
};