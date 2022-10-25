import React, { useState, useRef } from 'react'
import Portal from './Portal'
import { TooltipProps } from './types'
import { computePostion } from './computePosition'
import { StyledTooltip, StyledCommand, StyledSeparator } from './StyledTooltip'

function Tooltip({
  label,
  placement = 'bottom',
  offset = 8,
  borderRadius = 'base',
  disabled = 0,
  command,
  commandColor = 'white',
  commandBg = '#486581',
  bg = '#102A43',
  children,
}: TooltipProps) {
  const [show, setShow] = useState<number>(0)
  const positionRef = useRef({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseOver = (e: any) => {
    setShow(1)
    positionRef.current = computePostion(e.currentTarget, tooltipRef.current, placement, offset)
  }
  const handleMouseOut = () => setShow(0)

  let commands: string[] = []

  if (command?.includes('+')) {
    commands = command?.split('+')
  } else {
    commands.push(command!)
  }

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
            bg={bg}
            role='tooltip'
          >
            {label}
            {command !== undefined ? (
              <>
                <span style={{ margin: '0 7px' }}>·</span>
                {commands?.map((command, index) => (
                  <>
                    <StyledCommand background={commandBg} color={commandColor}>
                      {command}
                    </StyledCommand>
                    {commands.length > 1 && index < commands.length - 1 ? <StyledSeparator>+</StyledSeparator> : null}
                  </>
                ))}
              </>
            ) : null}
          </StyledTooltip>
        </Portal>
      )}
    </>
  )
}

export default Tooltip

{
  /* <span
  style={{
    backgroundColor: '#486581',
    padding: '3px 6px',
    minWidth: '12px',
    borderRadius: '4px',
    fontSize: '12px',
  }}
>
  {command.split('+')[0]}
</span>
<span style={{ padding: '0 4px' }}>+</span>
<span
  style={{
    backgroundColor: '#486581',
    padding: '3px 6px',
    minWidth: '12px',
    borderRadius: '4px',
    fontSize: '12px',
  }}
>
  {command.split('+')[1]}
</span> */
}
