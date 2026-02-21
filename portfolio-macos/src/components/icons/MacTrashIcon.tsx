interface MacTrashIconProps {
  size?: number;
  className?: string;
}

export const MacTrashIcon = ({ size = 64, className }: MacTrashIconProps) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/images-removebg-preview.png"
        alt="macOS Trash"
        className="w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          borderRadius: '8px'
        }}
      />
    </div>
  );
};