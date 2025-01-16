
// Unit tests for: addMouseEvents


import * as d3 from "d3";


// Import necessary modules and functions


// Import necessary modules and functions
// Mock the d3 selection and event handling
jest.mock("d3", () => ({
  select: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

describe('addMouseEvents() addMouseEvents method', () => {
  let chartArea: any;

  beforeEach(() => {
    // Set up a mock chart area
    chartArea = d3.select();
  });

  describe("Happy paths", () => {
    it("should add mouseover event listener to the chart area", () => {
      // Arrange
      const onSpy = jest.spyOn(chartArea, "on");

      // Act
      addMouseEvents(chartArea);

      // Assert
      expect(onSpy).toHaveBeenCalledWith("mouseover", expect.any(Function));
    });

    it("should add mouseout event listener to the chart area", () => {
      // Arrange
      const onSpy = jest.spyOn(chartArea, "on");

      // Act
      addMouseEvents(chartArea);

      // Assert
      expect(onSpy).toHaveBeenCalledWith("mouseout", expect.any(Function));
    });

    it("should add click event listener to the chart area", () => {
      // Arrange
      const onSpy = jest.spyOn(chartArea, "on");

      // Act
      addMouseEvents(chartArea);

      // Assert
      expect(onSpy).toHaveBeenCalledWith("click", expect.any(Function));
    });
  });

  describe("Edge cases", () => {
    it("should handle null chart area gracefully", () => {
      // Arrange
      const nullChartArea = null;

      // Act & Assert
      expect(() => addMouseEvents(nullChartArea)).not.toThrow();
    });

    it("should handle undefined chart area gracefully", () => {
      // Arrange
      const undefinedChartArea = undefined;

      // Act & Assert
      expect(() => addMouseEvents(undefinedChartArea)).not.toThrow();
    });

    it("should not add events if chart area is not a valid d3 selection", () => {
      // Arrange
      const invalidChartArea = {}; // Not a d3 selection
      const onSpy = jest.spyOn(chartArea, "on");

      // Act
      addMouseEvents(invalidChartArea);

      // Assert
      expect(onSpy).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: addMouseEvents
