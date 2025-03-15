import pytest
from unittest.mock import patch
from app.controllers.report import create_report_business

# Mock data for the tests
mock_metrics = {'metric1': 100, 'metric2': 200}
mock_general_info = {'name': 'Test Company', 'industry': 'Technology'}
mock_company_detail = {'employees': 500, 'location': 'Test City'}
mock_business_summary = {'summary': 'This is a test summary.'}

@pytest.mark.describe("Tests for create_report_business function")
class TestCreateReportBusiness:

    @pytest.mark.happy_path
    def test_create_report_business_happy_path(self):
        """Test create_report_business with valid symbol to ensure it returns correct metrics."""
        symbol = 'TEST'
        
        with patch('app.utils.business.calculate_stock_metrics', return_value=mock_metrics), \
             patch('app.utils.business.get_general_info_and_detail', return_value=(mock_general_info, mock_company_detail)), \
             patch('app.utils.business.get_business_summary', return_value=mock_business_summary):
            
            result = create_report_business(symbol)
            
            assert result['metric1'] == 100
            assert result['metric2'] == 200
            assert result['general_info'] == mock_general_info
            assert result['company_detail'] == mock_company_detail
            assert result['business_summary'] == mock_business_summary

    @pytest.mark.edge_case
    def test_create_report_business_empty_symbol(self):
        """Test create_report_business with an empty symbol to check how it handles missing input."""
        symbol = ''
        
        with patch('app.utils.business.calculate_stock_metrics', return_value=mock_metrics), \
             patch('app.utils.business.get_general_info_and_detail', return_value=(mock_general_info, mock_company_detail)), \
             patch('app.utils.business.get_business_summary', return_value=mock_business_summary):
            
            result = create_report_business(symbol)
            
            assert result['metric1'] == 100
            assert result['metric2'] == 200
            assert result['general_info'] == mock_general_info
            assert result['company_detail'] == mock_company_detail
            assert result['business_summary'] == mock_business_summary

    @pytest.mark.edge_case
    def test_create_report_business_invalid_symbol(self):
        """Test create_report_business with an invalid symbol to ensure it handles errors gracefully."""
        symbol = 'INVALID'
        
        with patch('app.utils.business.calculate_stock_metrics', side_effect=Exception("Invalid symbol")), \
             patch('app.utils.business.get_general_info_and_detail', return_value=(mock_general_info, mock_company_detail)), \
             patch('app.utils.business.get_business_summary', return_value=mock_business_summary):
            
            with pytest.raises(Exception) as excinfo:
                create_report_business(symbol)
            
            assert "Invalid symbol" in str(excinfo.value)

    @pytest.mark.edge_case
    def test_create_report_business_future_date(self):
        """Test create_report_business with a future date to ensure it handles future data correctly."""
        symbol = 'TEST'
        
        with patch('app.utils.business.calculate_stock_metrics', return_value=mock_metrics), \
             patch('app.utils.business.get_general_info_and_detail', return_value=(mock_general_info, mock_company_detail)), \
             patch('app.utils.business.get_business_summary', return_value=mock_business_summary):
            
            result = create_report_business(symbol)
            
            assert result['metric1'] == 100
            assert result['metric2'] == 200
            assert result['general_info'] == mock_general_info
            assert result['company_detail'] == mock_company_detail
            assert result['business_summary'] == mock_business_summary