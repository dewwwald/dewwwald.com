export abstract class AbstractSvgChartComponent {
  private barAnimations = [];

  public canvasHeight;
  public canvasWidth;
  public elm;
  public graphBars;
  public viewBox;

  abstract get inputRatioWidth ();
  abstract get inputRatioHeight ();
  abstract get padding ();
  abstract get barHeights ();

  constructor(elm) {
    this.elm = elm;
  }

  _determineRatio() {
    this.canvasWidth = this.elm.clientWidth / this.inputRatioWidth;
    this.canvasHeight = this.canvasWidth * this.inputRatioHeight / this.inputRatioWidth;
  }

  /**
   * CALL THESE YOURSELF !!
   */
  setupRectangles() {
    if (typeof this.barHeights !== 'undefined') {
      let colWidth = this.canvasWidth / this.barHeights.length;
      let barWidth = colWidth - (1 + 1 / this.barHeights.length) * this.padding;
      this.graphBars = [];
      this.barHeights.forEach((val, i) => {
        this.graphBars.push({
          finalHeight: val.percentage / 100 * this.canvasHeight,
          color: val.color,
          label: val.label,
          offsetY: this.canvasHeight - val.percentage / 100 * this.canvasHeight,
          barWidth: barWidth,
          positionX: this.padding * i + barWidth * i,
          positionY: this.canvasHeight,
        })
      });
    }
  }

  initialize() {
    this._determineRatio();
    this.setupRectangles();
    this.viewBox = `0 0 ${this.canvasWidth} ${this.canvasHeight + 25}`;
  }
}
