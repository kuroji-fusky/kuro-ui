import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { KuroUIBaseElement } from "../base-element"

@customElement("kuroui-accordion-wrapper")
export class KuroUIAccordionWrapper extends KuroUIBaseElement {
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
export class KuroUIAccordionItem extends KuroUIBaseElement {
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
