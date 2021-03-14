class Flyout {
  constructor(component) {
    this.component = component;
    this.elements = {};
    this.elements.flyoutEl = document.getElementById(
      component.getAttribute("aria-controls")
    );
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.component.addEventListener("click", this.handleToggleShare.bind(this));
  }

  handleToggleShare() {
    const expandedValue = this.component.getAttribute("aria-expanded");

    if (expandedValue === "false") {
      this.elements.flyoutEl.classList.remove("hidden");
      this.elements.flyoutEl.classList.add("flex");
      this.component.setAttribute("aria-expanded", "true");
    } else {
      this.elements.flyoutEl.classList.remove("flex");
      this.elements.flyoutEl.classList.add("hidden");
      this.component.setAttribute("aria-expanded", "false");
    }
  }
}

export default Flyout;
