import React, { useState, useRef } from 'react'
import Portal from './Portal'
import styled from 'styled-components'
import { TooltipProps, Placement } from './types'
import { radii } from './radius'
import { computePostion } from './computePosition'

interface StyleProps {
  show: number
  placement: Placement
  radius: any
  positionRef: any
}

const StyledTooltip = styled.span<StyleProps>`
  width: max-content;
  position: fixed;
  top: ${(props) => props.positionRef.current.y}px;
  left: ${(props) => props.positionRef.current.x}px;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.02rem;
  background-color: rgba(0, 5, 11, 0.9);
  color: rgba(255, 255, 255, 1);
  pointer-events: none;
  padding: 8px 15px;
  border-radius: ${(props) => radii[props.radius]};
  z-index: 99999;
  display: inline-block;
  white-space: nowrap;
  opacity: ${(props) => props.show};

  transition-property: transform, opacity !important;
  transition-duration: 0.06s !important;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1) !important;

  transform-origin: ${(props) => negate(props.placement)};
  transform: scale(${(props) => (props.show ? 1 : 0.7)});
`

function negate(placement: Placement) {
  switch (placement) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'top':
      return 'bottom'
    default:
      return 'top'
  }
}

function Tooltip({
  label,
  placement = 'bottom',
  offset = 8,
  borderRadius = 'base',
  disabled = 0,
  command,
  children,
}: TooltipProps) {
  const [show, setShow] = useState<number>(0)
  const positionRef = useRef({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLSpanElement>(null)

  const handleMouseOver = (e: any) => {
    setShow(1)
    positionRef.current = computePostion(e.currentTarget, tooltipRef.current, placement, offset)
  }
  const handleMouseOut = () => setShow(0)

  return (
    <>
      {disabled
        ? children
        : React.cloneElement(children, {
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut,
          })}
      {disabled || (
        <Portal>
          <StyledTooltip
            ref={tooltipRef}
            positionRef={positionRef}
            show={show}
            radius={borderRadius}
            placement={placement}
            role='tooltip'
          >
            {label}
            {command !== undefined ? (
              <>
                <span style={{ margin: '0 7px' }}>·</span>
                <span
                  style={{
                    backgroundColor: '#1f2733',
                    padding: '1px 6px',
                    minWidth: '12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}
                >
                  {command}
                </span>
              </>
            ) : null}
          </StyledTooltip>
        </Portal>
      )}
    </>
  )
}

export default Tooltip
