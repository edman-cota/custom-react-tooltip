import styled from 'styled-components'
import { Placement } from './types'
import { radii } from './radius'

interface StyleProps {
  show: number
  placement: Placement
  radius: any
  positionRef: any
  bg: string
}

interface CommandProps {
  color: string
  background: string
}

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

export const StyledTooltip = styled.div<StyleProps>`
  width: max-content;
  position: fixed;
  top: ${(props) => props.positionRef.current.y}px;
  left: ${(props) => props.positionRef.current.x}px;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.02rem;
  background-color: ${(props) => props.bg};
  color: rgba(255, 255, 255, 1);
  pointer-events: none;
  padding: 9px 15px;
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
export const StyledCommand = styled.span<CommandProps>`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  padding: 3px 6px;
  min-width: 12px;
  border-radius: 4px;
  font-size: 12px;
`

export const StyledSeparator = styled.span`
  padding: 4px;
  font-size: 12px;
`
