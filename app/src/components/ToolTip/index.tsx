import * as React from "react";

import styles from "./index.module.scss";

interface ToolTipProps {
  children: React.ReactElement;
  text: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ children, text }) => {
  const refSetTimeout = React.useRef<NodeJS.Timeout>(null);

  const [showTooltip, setShowTooltip] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    if (refSetTimeout.current) return;
    refSetTimeout.current = setTimeout(() => {
      setShowTooltip(true);
    }, 500);
  }

  const handleMouseLeave = () => {
    clearTimeout(refSetTimeout.current);
    refSetTimeout.current = null;
    setShowTooltip(false);
  };

  const getPositionStyle = () => {
    return { top: mousePosition.y + 10, left: mousePosition.x + 10 }
  }

  return (
    <div
      className={styles.ToolTipContainer}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      {showTooltip && text &&
        <span
          className={styles.ToolTip}
          style={getPositionStyle()}
        >
          {text}
        </span>}
    </div >
  )
}
export default ToolTip;
