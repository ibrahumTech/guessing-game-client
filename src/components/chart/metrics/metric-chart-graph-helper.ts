import { IMetricChartData, IMetricMappedDataPoint } from '../types';;

// height of the svg element
const SVG_HEIGHT = 85;

// width of the svg element
const SVG_WIDTH = 255;

// radius of the circle at the tip of the line
const CIRCLE_RADIUS = 5;

// [start, end] of the x axis of the grid
const GRID_AXIS_X = [0, SVG_WIDTH - CIRCLE_RADIUS];

// [start, end] of the y axis of the grid
const GRID_AXIS_Y = [CIRCLE_RADIUS, SVG_HEIGHT - 2];

// month translations
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Gets the y values for the horizontal grid lines
 * @returns {number[]} an array of y values
 */
function getGridLineYValues(): number[] {
  return [
    GRID_AXIS_Y[0],
    getAxisLength(GRID_AXIS_Y) / 3 + GRID_AXIS_Y[0],
    getAxisLength(GRID_AXIS_Y) * (2 / 3) + GRID_AXIS_Y[0],
    GRID_AXIS_Y[1]
  ]
}

// Gets the length of an axis (represented as a tuple)
function getAxisLength(axis: number[]): number {
  return axis[1] - axis[0];
}

/**
 * Creates a label for when x=0
 * @param {IMetricChartData} dataPoints Array of data points from API
 * @returns {string} text label to display when x=0
 */
function getXAxisStartLabel(dataPoints: IMetricChartData): string {
  return `${dataPoints[0].index}`
}


function mapDataToSvgCoordinates(dataPoints: IMetricChartData): IMetricMappedDataPoint[] {
  // We want the max x value to be the time value of the last data point
  const xMax = dataPoints[dataPoints.length - 1].index;

  // We want the time value of the first data point to be x=0 in the SVG
  const xMin = dataPoints[0].index;

  // We want the max y value to be the "value" value of the last dataPoint
  const yMax = dataPoints[dataPoints.length - 1].value;

  // We want the y axis to start at 0
  const yMin = 0;

  return dataPoints.map(dataPoint => {

    // Get a factor to scale an API datapoint's x value to
    // an x value in the SVG grid
    const xScaleFactor = getAxisLength(GRID_AXIS_X) / (xMax - xMin);

    // Subtract xMin from the current xValue (since xMin is going
    // to be treated as 0 in the SVG grid), and multiply it by the
    // xScaleFactor value to scale the x value to an appropriate value
    // in the SVG grid
    const mappedX = (dataPoint.index - xMin) * xScaleFactor;

    // Same logic as with getting the xScaleFactor
    const yScaleFactor = getAxisLength(GRID_AXIS_Y) / (yMax - yMin);

    // Same logic as with scaling the xValue. The only difference here is
    // the positive Y direction goes DOWNWARD in the SVG coordinate system,
    // which means this is an inverted y value of what needs to be shown
    // in the SVG grid
    const invertedMappedY = dataPoint.value * yScaleFactor;

    // Get the correct mapped Y value by subtracting the invertedYValue
    // from the max value of the SVG grid y axis
    const mappedY = GRID_AXIS_Y[1] - invertedMappedY;

    return { x: mappedX, y: mappedY };
  });
}

export default {
  SVG_WIDTH,
  SVG_HEIGHT,
  GRID_AXIS_X,
  GRID_AXIS_Y,
  getGridLineYValues,
  getXAxisStartLabel,
  mapDataToSvgCoordinates
}