import { LitElement, html, css } from "lit"
import { customElement, property, query, state } from "lit/decorators.js"

@customElement("kuroui-split-panel")
export class KuroUISplitPanel extends LitElement {
  @property({ type: String, attribute: "window-breakpoint", reflect: true })
  windowBreakpoint = "768px"

  @property({ type: String, attribute: "container-breakpoint" })
  containerBreakpoint = null

  @property({ type: String, attribute: "shelf-min-width", reflect: true })
  shelfMinWidth = "300px"

  @property({ type: Boolean, reflect: true })
  isDraggable = false

  @state()
  _currentShelfWidth = parseInt(this.shelfMinWidth)

  @state()
  _isMobileLayout = false

  @state()
  _isSeparatorDragging = false

  // Handlers
  handleWindowResize: () => void
  handleMouseDown: () => void
  handleMouseUp: () => void

  @query(".separator")
  separatorEl: Element

  protected firstUpdated() {
    const rootEl = this.renderRoot?.firstElementChild
    const { width: rootWidth } = rootEl.getBoundingClientRect()

    const separatorRekt = this.separatorEl.getBoundingClientRect()

    const handleSeparatorDrag = ({ x }) => {
      if (parseInt(this.shelfMinWidth) > x) return

      this._currentShelfWidth = x - Math.floor(separatorRekt.width)
    }

    // Handle the dragging part by adding/removing the event listener
    this.handleMouseDown = () => {
      if (!this.isDraggable) return

      this._isSeparatorDragging = true
      window.addEventListener("mousemove", handleSeparatorDrag)
    }
    this.handleMouseUp = () => {
      if (!this.isDraggable) return
      if (!this._isSeparatorDragging) return

      window.removeEventListener("mousemove", handleSeparatorDrag)

      // set it to false so stuff don't go to shit
      this._isSeparatorDragging = false
    }

    this.separatorEl.addEventListener("mousedown", this.handleMouseDown)
    window.addEventListener("mouseup", this.handleMouseUp)
  }

  override connectedCallback() {
    super.connectedCallback()

    // Handling window resize for responsive layout
    this.handleWindowResize = () => {
      // prettier-ignore
      this._isMobileLayout =window.innerWidth <= parseInt(this.windowBreakpoint)
    }

    // can't use both container and window breakpoints because it's confusing and doesn't make sense
    if (this.windowBreakpoint && this.containerBreakpoint) {
      console.warn(
        "Attributes 'container-breakpoint' and 'window-breakpoint' can't be used at the same time! The 'container-breakpoint' is ignored and uses 'window-breakpoint' instead.",
      )
      return
    }

    window.addEventListener("resize", this.handleWindowResize)
    this.handleWindowResize()
  }

  override disconnectedCallback() {
    super.disconnectedCallback()

    // Responsive Layout
    window.removeEventListener("resize", this.handleWindowResize)

    // Adjusting viewport
    // NOTE: this.separatorEl returns undefined here but idk if that'll do
    // anything if this unmounts
    this.separatorEl.removeEventListener("mousedown", this.handleMouseDown)
    window.removeEventListener("mouseup", this.handleMouseUp)
  }

  static styles = css`
    .panel {
      border: var(--panel-border, 1px solid #757575);
      border-radius: var(--panel-border-radius, 0);
      padding: 0.75rem 0.66rem;
    }
    .panel.shelf {
      flex-shrink: 0;
    }
    .panel.container {
      flex: 1 0 0;
    }
    .separator {
      padding: 0 0.25rem;
      margin: 0 0.15rem;
      cursor: col-resize;
    }
    .separator:hover::before {
      background-color: var(--separator-color-hover, lime);
    }
    .separator::before {
      content: "";
      display: block;
      height: 100%;
      width: var(--separator-width, 2px);
      background-color: var(--separator-color, #757575);
    }
    .separator.hidden::before {
      --separator-width: 0;
    }
    .separator.hidden {
      cursor: default;
    }
    .viz-hidden {
      display: none;
    }
  `

  render() {
    return html`
      <div
        style="display: flex;position: relative;${this._isSeparatorDragging
          ? "user-select: none;"
          : ""}"
      >
        ${!this._isMobileLayout
          ? null
          : html`
              <div part="mobile-expander">
                <span>Panel</span>
              </div>
            `}
        <div
          part="panel shelf"
          class="panel shelf${!this._isMobileLayout ? "" : " on-mobile"}"
          style="width: ${this._currentShelfWidth - 20}px;"
        >
          <slot name="shelf" part="shelf-container"></slot>
        </div>
        <div
          class="separator${!this.isDraggable ? " hidden" : ""}${!this
            ._isMobileLayout
            ? ""
            : " viz-hidden"}"
          aria-hidden="true"
        ></div>
        <div class="panel container" part="panel container">
          <slot></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kuroui-split-panel": KuroUISplitPanel
  }
}
