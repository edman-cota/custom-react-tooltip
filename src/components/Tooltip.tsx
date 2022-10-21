import React, { useState, useRef } from 'react'
import Portal from './Portal'
import styled from 'styled-components'
import { TooltipProps } from './definitions'
import { radii } from './radius'

interface StyleProps {
  show: number
  placement: string
  radius: any
  positionRef: any
}

const StyledTooltip = styled.span<StyleProps>`
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

function isHorizontal(placement: string) {
  return placement === 'left' || placement === 'right'
}

function isVertical(placement: string) {
  return placement === 'top' || placement === 'bottom'
}

function negate(placement: string) {
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

const point = () => ({
  x: 0,
  y: 0,
  reset(p?: any) {
    this.x = p.x
    this.y = p.y
  },
  restrictRect(rect: any) {
    if (this.x < rect.l) this.x = rect.l
    else if (this.x > rect.r) this.x = rect.r
    if (this.y < rect.t) this.y = rect.t
    else if (this.y > rect.b) this.y = rect.b
  },
})

const getPoint = (currentElement: any, tt: any, placement: string, space: number) => {
  let recurCount = 0
  const pt = point()

  const bounderies = {
    left: space,
    top: space,
    right: document.body.clientWidth - (tt.clientWidth + space),
    bottom: window.innerHeight - (tt.clientWidth + space),
  }

  const elRect = currentElement.getBoundingClientRect()

  return (function recursive(placement) {
    recurCount++
    switch (placement) {
      case 'left':
        pt.x = elRect.left - (tt.offsetWidth + space)
        pt.y = elRect.top + (currentElement.offsetHeight - tt.offsetHeight) / 2
        break
      case 'right':
        pt.x = elRect.right + space
        pt.y = elRect.top + (currentElement.offsetHeight - tt.offsetHeight) / 2
        break
      case 'top':
        pt.x = elRect.left + (currentElement.offsetWidth - tt.offsetWidth) / 2
        pt.y = elRect.top - (tt.offsetHeight + space)
        break
      default:
        pt.x = elRect.left + (currentElement.offsetWidth - tt.offsetWidth) / 2
        pt.y = elRect.bottom + space
    }

    if (recurCount < 3) {
      if (
        (isHorizontal(placement) && (pt.x < bounderies.left || pt.x > bounderies.right)) ||
        (isVertical(placement) && (pt.y < bounderies.top || pt.y > bounderies.bottom))
      ) {
        pt.reset(recursive(negate(placement)))
      }
    }

    // restric to rect boundry
    pt.restrictRect(bounderies)

    return pt
  })(placement)
}

function Tooltip({
  label,
  placement = 'bottom',
  space = 15,
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
    positionRef.current = getPoint(e.currentTarget, tooltipRef.current, placement, space)
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
