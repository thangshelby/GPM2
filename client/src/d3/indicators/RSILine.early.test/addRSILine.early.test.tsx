
// Unit tests for: addRSILine

import '@testing-library/react'import * as d3 from "d3";
import addRSILine from '../RSILine';
import "@testing-library/jest-dom";

jest.mock("d3", () => ({
  select: jest.fn(() => ({
    attr: jest.fn().mockReturnThis(),
    append: jest.fn(() => ({
      attr: jest.fn().mockReturnThis(),
      style: jest.fn().mockReturnThis(),
      text: jest.fn().mockReturnThis(),
      data: jest.fn().mockReturnThis(),
      enter: jest.fn().mockReturnThis(),
    })),
    remove: jest.fn(),
    empty: jest.fn(() => false),
  })),
  scaleLinear: jest.fn(() => ({
    domain: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    ticks: jest.fn(() => [0, 25, 50, 75, 100]),
  })),
  line: jest.fn(() => ({
    x: jest.fn().mockReturnThis(),
    y: jest.fn().mockReturnThis(),
  })),
}));

jest.mock("../../../api", () => ({
  fetchStock: jest.fn(),
}));

jest.mock("../../../constant", () => ({
  width: 800,
  height: 600,
}));

describe('addRSILine() addRSILine method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    it('should render the RSI line chart correctly with valid data', async () => {
      // Mock the fetchStock API response
      const mockData = Array.from({ length: 20 }, (_, i) => ({
        Date: `2023-01-${i + 1}`,
        RSI: Math.random() * 100,
      }));
      fetchStock.mockResolvedValue(mockData);

      // Call the function
      await addRSILine(jest.fn(), jest.fn(), 20, 100, 0);

      // Assertions
      expect(fetchStock).toHaveBeenCalledWith('/indicators/RSI?ticker=AAA&window=14');
      expect(d3.select).toHaveBeenCalledWith('.chart');
      expect(d3.select).toHaveBeenCalledWith('.x-axis-text');
      expect(d3.select).toHaveBeenCalledWith('.RSI-chart-area');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data response gracefully', async () => {
      // Mock the fetchStock API response with empty data
      fetchStock.mockResolvedValue([]);

      // Call the function
      await addRSILine(jest.fn(), jest.fn(), 20, 100, 0);

      // Assertions
      expect(fetchStock).toHaveBeenCalledWith('/indicators/RSI?ticker=AAA&window=14');
      expect(d3.select).toHaveBeenCalledWith('.chart');
      expect(d3.select).toHaveBeenCalledWith('.x-axis-text');
      expect(d3.select).toHaveBeenCalledWith('.RSI-chart-area');
    });

    it('should handle dataUsed less than window size', async () => {
      // Mock the fetchStock API response
      const mockData = Array.from({ length: 10 }, (_, i) => ({
        Date: `2023-01-${i + 1}`,
        RSI: Math.random() * 100,
      }));
      fetchStock.mockResolvedValue(mockData);

      // Call the function
      await addRSILine(jest.fn(), jest.fn(), 10, 100, 0);

      // Assertions
      expect(fetchStock).toHaveBeenCalledWith('/indicators/RSI?ticker=AAA&window=14');
      expect(d3.select).toHaveBeenCalledWith('.chart');
      expect(d3.select).toHaveBeenCalledWith('.x-axis-text');
      expect(d3.select).toHaveBeenCalledWith('.RSI-chart-area');
    });
  });
});

// End of unit tests for: addRSILine
