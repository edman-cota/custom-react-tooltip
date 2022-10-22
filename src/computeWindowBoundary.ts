/**
 *  @ window.innerHeight/Width: returns the interior height of the window in pixels,
 *  including the height of the horizontal/vertical scroll bar, if present.
 *
 *  @ Element.clientWidth/Height: it's the inner width/height of an element in pixels.
 *  It includes padding but excludes borders, margins, and vertical scrollbars (if present).
 */

export const computeWindowBoundary = (offset: number, tt: any) => {
  return {
    left: offset,
    top: offset,
    right: document.body.clientWidth - (tt.clientWidth + offset),
    bottom: window.innerHeight - (tt.clientHeight + offset),
  }
}
