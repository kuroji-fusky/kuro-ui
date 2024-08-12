import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"

@customElement("kuroui-accordion-wrapper")
export class KuroUIAccordionWrapper extends LitElement {
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

@customElement("kuroui-accordion-item")
export class KuroUIAccordionItem extends LitElement {
  render() {
    return html``
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kuroui-accordion-wrapper": KuroUIAccordionWrapper
    "kuroui-accordion-item": KuroUIAccordionItem
  }
}
