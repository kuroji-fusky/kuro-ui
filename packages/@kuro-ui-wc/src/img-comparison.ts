import { LitElement, html } from "lit"
import { customElement, property, state } from "lit/decorators.js"

@customElement("kuroui-img-comparison")
export class KuroUIImgComparison extends LitElement {
  @property({ type: Number, attribute: "initial-marker-position" })
  initialMarkerPos = 0

  @state()
  _markerPos = this.initialMarkerPos

  override connectedCallback() {
    super.connectedCallback()
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
  }

  render() {
    return html``
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kuroui-img-comparison": KuroUIImgComparison
  }
}
