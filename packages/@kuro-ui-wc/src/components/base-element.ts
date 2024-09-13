import { LitElement, css } from "lit"
import { property } from "lit/decorators"

export class KuroUIBaseElement extends LitElement {
  @property({ type: Boolean, attribute: "debug-mode" })
  debugMode = false

  static resetStyles = css`
    *,
    ::before,
    ::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      min-width: 0;
    }
    :host {
      font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
    }
    button {
      background: none;
      border: none;
      padding: none;
    }
  `
}
