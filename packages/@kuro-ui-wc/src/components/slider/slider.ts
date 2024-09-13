import { html, css } from "lit"
import { customElement, property, query, state } from "lit/decorators.js"
import { KuroUIBaseElement } from "../base-element"
import { calcRelativeValue, listenMultipleEvents } from "../../../../utils"

@customElement("kuroui-slider")
export class KuroUISlider extends KuroUIBaseElement {
  static styles = [
    KuroUIBaseElement.resetStyles,
    css`
      .trackbar {
        --trackbar-track-height: 1rem;
        --trackbar-marker-size: 2.5rem;
      }
      .trackbar .container {
        position: relative;
      }
      .trackbar .track {
        border-radius: 1rem;

        width: var(--trackbar-track-width, 600px);
        height: var(--trackbar-track-height);
        margin: calc(var(--trackbar-track-height) * 0.5) 0;
        background-color: #c8c2ff;
        overflow: hidden;
      }
      .trackbar .marker {
        user-select: none;
        position: absolute;
        left: var(--trackbar-current-position, 0);
        border-radius: 9999px;

        top: 0;
        width: calc(var(--trackbar-marker-size) * 0.8);
        height: calc(var(--trackbar-marker-size) * 0.8);

        transform: translate3d(-50%, 0, 0);
        background-color: var(--trackbar-marker-color, #6049ff);
      }

      .trackbar .fill {
        height: 100%;
        width: var(--trackbar-current-position, 0px);
        background-color: var(--trackbar-fill-color, #6049ff);
      }
    `,
  ]

  @property({ type: String })
  orientation = "horizontal"

  @query(".trackbar.container")
  tContainer: HTMLDivElement

  @query(".trackbar.container")
  tTrack: HTMLDivElement

  @query(".trackbar.container")
  tMarker: HTMLDivElement

  @state()
  private _trackPosition: { [x: string]: number }

  @state()
  private _isMarkerDragging = false

  handleTrackerPosition = () => {
    const { left, width } = this.tTrack.getBoundingClientRect()

    this._trackPosition = {
      left,
      width,
    }
  }

  handleRelativePositionFromTracker = (currentVal: number) => {
    const leftHandValFix = currentVal - this._trackPosition.left

    return calcRelativeValue(leftHandValFix, this._trackPosition.width)
  }

  connectedCallback() {
    super.connectedCallback()

    listenMultipleEvents(
      window,
      ["resize", "focus"],
      this.handleTrackerPosition,
      { callOnInit: true },
    )

    const handleDragPosition = (e: MouseEvent) => {
      const relativeMarkerPosition = this.handleRelativePositionFromTracker(e.x)

      this.tContainer.setAttribute(
        "style",
        `--trackbar-current-position: ${relativeMarkerPosition}%;`,
      )
    }

    this.tMarker.addEventListener("pointerdown", () => {
      this._isMarkerDragging = true
      this.setAttribute("is-dragging", "")

      window.addEventListener("pointermove", handleDragPosition)
    })

    // Remove listener when user lets go or focuses to another window
    listenMultipleEvents(window, ["pointerup", "blur"], () => {
      if (this._isMarkerDragging) {
        this._isMarkerDragging = false
        this.removeAttribute("is-dragging")

        window.removeEventListener("pointermove", handleDragPosition)
      }
    })
  }

  render() {
    return html` <div class="trackbar container" tabindex="0">
      <div class="trackbar track">
        <div class="trackbar fill"></div>
      </div>
      <div class="trackbar marker"></div>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kuroui-slider": KuroUISlider
  }
}
