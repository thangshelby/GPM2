
// Unit tests for: CandlestickChart

import React from 'react'
import * as d3 from "d3";
import CandlestickChart from '../CandleStickChart';


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';


// Mock d3 module
jest.mock("d3", () => {
  const originalModule = jest.requireActual("d3");
  return {
    ...originalModule,
    select: jest.fn(() => ({
      selectAll: jest.fn(() => ({
        remove: jest.fn(),
        data: jest.fn(() => ({
          enter: jest.fn(() => ({
            append: jest.fn(() => ({
              attr: jest.fn(() => ({
                style: jest.fn(),
              })),
            })),
          })),
        })),
      })),
      append: jest.fn(() => ({
        attr: jest.fn(() => ({
          style: jest.fn(),
        })),
      })),
    })),
    scaleTime: jest.fn(() => ({
      domain: jest.fn(() => ({
        range: jest.fn(),
      })),
    })),
    scaleLinear: jest.fn(() => ({
      domain: jest.fn(() => ({
        range: jest.fn(),
      })),
    })),
    axisBottom: jest.fn(() => jest.fn()),
    axisLeft: jest.fn(() => jest.fn()),
    zoom: jest.fn(() => ({
      scaleExtent: jest.fn(() => ({
        translateExtent: jest.fn(() => ({
          on: jest.fn(),
        })),
      })),
    })),
    pointer: jest.fn(() => [0, 0]),
  };
});

describe('CandlestickChart() CandlestickChart method', () => {
  const mockData = [
    { Date: '2023-01-01', Open: 100, High: 110, Low: 90, Close: 105 },
    { Date: '2023-01-02', Open: 105, High: 115, Low: 95, Close: 100 },
  ];

  const mockSetDateMouseOver = jest.fn();

  // Happy Path Tests
  describe('Happy Path Tests', () => {
    it('renders the SVG element', () => {
      // Test to ensure the SVG element is rendered
      render(<CandlestickChart data={mockData} headerHeight={50} setDateMouseOver={mockSetDateMouseOver} />);
      const svgElement = screen.getByRole('img', { hidden: true });
      expect(svgElement).toBeInTheDocument();
    });

    it('renders candlesticks for each data point', () => {
      // Test to ensure candlesticks are rendered for each data point
      render(<CandlestickChart data={mockData} headerHeight={50} setDateMouseOver={mockSetDateMouseOver} />);
      expect(d3.select).toHaveBeenCalled();
      expect(d3.select().selectAll).toHaveBeenCalledWith('.candle');
    });
  });

  // Edge Case Tests
  describe('Edge Case Tests', () => {
    it('handles empty data array gracefully', () => {
      // Test to ensure component handles empty data array without errors
      render(<CandlestickChart data={[]} headerHeight={50} setDateMouseOver={mockSetDateMouseOver} />);
      const svgElement = screen.getByRole('img', { hidden: true });
      expect(svgElement).toBeInTheDocument();
    });

    it('handles data with extreme values', () => {
      // Test to ensure component handles data with extreme values
      const extremeData = [
        { Date: '2023-01-01', Open: 1, High: 1000, Low: 0, Close: 500 },
      ];
      render(<CandlestickChart data={extremeData} headerHeight={50} setDateMouseOver={mockSetDateMouseOver} />);
      expect(d3.select).toHaveBeenCalled();
    });
  });
});

// End of unit tests for: CandlestickChart
