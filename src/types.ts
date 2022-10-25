import React, { ReactElement } from 'react'

export type Alignment = 'start' | 'end'
export type Side = 'top' | 'right' | 'bottom' | 'left'
export type AlignedPlacement = `${Side}-${Alignment}`
export type Placement = Side | AlignedPlacement

export type Boundary = any
export type RootBoundary = 'viewport' | 'document'

export enum borderRadius {
  none = '0',
  sm = '0.125rem',
  base = '0.25rem',
  md = '0.375rem',
  lg = '0.5rem',
  xl = '0.75rem',
}

export interface TooltipProps {
  /**
   * The React component to use as the
   * trigger or reference for the tooltip.
   */
  children: ReactElement
  /**
   * The label for the tooltip
   */
  label: React.ReactNode
  /**
   * The placement of the popper relative to its reference.
   */
  placement?: Placement
  /**
   * The distance or margin between the reference and the tooltip.
   */
  offset?: number
  /**
   * Custom background color for the tooltip
   */
  bg?: string

  variant?: 'solid' | 'subtle'

  borderRadius?: string

  disabled?: number

  delay?: number

  command?: string

  commandColor?: string

  commandBg?: string

  args: any
}
