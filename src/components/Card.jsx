import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg';
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const borders = {
    none: '',
    light: 'border border-gray-200',
    normal: 'border border-gray-300',
    dark: 'border border-gray-400',
  };

  const borderClass = border ? borders.normal : '';
  
  const classes = `
    ${baseClasses}
    ${paddings[padding]}
    ${shadows[shadow]}
    ${borderClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes} {...props}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
