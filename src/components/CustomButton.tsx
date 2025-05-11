import React, { useState } from "react";
import { Link } from "react-router-dom";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  to?: string; // Add to prop for navigation
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  className = "",
  style = {},
  type = "button",
  to,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    background: "rgba(230, 168, 0, 0.7)",
    color: "#000000",
    fontWeight: 600,
    borderRadius: "6px",
    transition: "all 0.3s ease",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    textDecoration: "none", // For link version
    display: "inline-block", // For link version
    ...style,
  };

  const hoverStyle: React.CSSProperties = {
    background: "rgba(230, 168, 0, 0.9)",
    transform: "scale(1.05)",
  };

  // If 'to' prop is provided, return a Link component
  if (to) {
    return (
      <Link
        to={to}
        className={`${className}`}
        style={{
          ...baseStyle,
          ...(isHovered ? hoverStyle : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    );
  }

  // Otherwise return a regular button
  return (
    <button
      type={type}
      className={`${className}`}
      style={{
        ...baseStyle,
        ...(isHovered ? hoverStyle : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};
