import { Boundary, Placement } from './types'
import { computeWindowBoundary } from './computeWindowBoundary'

function isHorizontal(placement: Placement) {
  return placement === 'left' || placement === 'right'
}

function isVertical(placement: Placement) {
  return placement === 'top' || placement === 'bottom'
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

const point = () => ({
  x: 0,
  y: 0,
  reset(p?: any) {
    this.x = p.x
    this.y = p.y
  },
  restrictRect(boundary: Boundary) {
    if (this.x < boundary.left) this.x = boundary.left
    else if (this.x > boundary.right) this.x = boundary.right
    if (this.y < boundary.top) this.y = boundary.top
    else if (this.y > boundary.bottom) this.y = boundary.bottom
  },
})

/**
 *
 * @param referenceElement: also known as the anchor element, this is the element that is being referred to for positioning.
 * @param floatingElement: this is the element that floats next to the reference element, remaining anchored to it.
 * @param placement: Places your floating element relative to another one. Where to place the floating element relative to its reference element.
 * @param offset: A number represents the distance (gutter or margin) between the floating element and the reference element.
 * @returns: x, y, reset, restrictRect
 */
export const computePostion = (referenceElement: any, floatingElement: any, placement: Placement, offset: number) => {
  let recurCount = 0
  const pt = point()

  const boundary: Boundary = computeWindowBoundary(offset, floatingElement)

  const elRect = referenceElement.getBoundingClientRect()

  return (function recursive(placement) {
    recurCount++
    switch (placement) {
      case 'left':
        pt.x = elRect.left - (floatingElement.offsetWidth + offset)
        pt.y = elRect.top + (referenceElement.offsetHeight - floatingElement.offsetHeight) / 2
        break
      case 'right':
        pt.x = elRect.right + offset
        pt.y = elRect.top + (referenceElement.offsetHeight - floatingElement.offsetHeight) / 2
        break
      case 'top':
        pt.x = elRect.left + (referenceElement.offsetWidth - floatingElement.offsetWidth) / 2
        pt.y = elRect.top - (floatingElement.offsetHeight + offset)
        break
      default:
        pt.x = elRect.left + (referenceElement.offsetWidth - floatingElement.offsetWidth) / 2
        pt.y = elRect.bottom + offset
    }

    if (recurCount < 3) {
      if (
        (isHorizontal(placement) && (pt.x < boundary.left || pt.x > boundary.right)) ||
        (isVertical(placement) && (pt.y < boundary.top || pt.y > boundary.bottom))
      ) {
        pt.reset(recursive(negate(placement)))
      }
    }

    // restric to rect boundry
    pt.restrictRect(boundary)

    console.log('points: ', pt)
    return pt
  })(placement)
}
