import pytest
from unittest.mock import patch
from app.controllers.report import create_report_financial

# Describe block for all tests related to create_report_financial
@pytest.mark.describe("Tests for create_report_financial function")
class TestCreateReportFinancial:

    @pytest.mark.happy_path
    def test_create_report_financial_happy_path(self):
        """
        Test that create_report_financial returns the correct structure
        and data when get_balance_sheet returns a valid balance sheet.
        """
        symbol = "AAPL"
        expected_balance_sheet = {"assets": 1000, "liabilities": 500}

        with patch('app.utils.financial.get_balance_sheet', return_value=expected_balance_sheet):
            result = create_report_financial(symbol)
            assert result == {'balance_sheet': expected_balance_sheet}

    @pytest.mark.edge_case
    def test_create_report_financial_empty_symbol(self):
        """
        Test that create_report_financial handles an empty symbol gracefully.
        """
        symbol = ""
        expected_balance_sheet = {}

        with patch('app.utils.financial.get_balance_sheet', return_value=expected_balance_sheet):
            result = create_report_financial(symbol)
            assert result == {'balance_sheet': expected_balance_sheet}

    @pytest.mark.edge_case
    def test_create_report_financial_none_symbol(self):
        """
        Test that create_report_financial handles a None symbol gracefully.
        """
        symbol = None
        expected_balance_sheet = {}

        with patch('app.utils.financial.get_balance_sheet', return_value=expected_balance_sheet):
            result = create_report_financial(symbol)
            assert result == {'balance_sheet': expected_balance_sheet}

    @pytest.mark.edge_case
    def test_create_report_financial_unexpected_data_structure(self):
        """
        Test that create_report_financial handles unexpected data structure
        returned by get_balance_sheet.
        """
        symbol = "AAPL"
        unexpected_balance_sheet = "unexpected_string"

        with patch('app.utils.financial.get_balance_sheet', return_value=unexpected_balance_sheet):
            result = create_report_financial(symbol)
            assert result == {'balance_sheet': unexpected_balance_sheet}

    @pytest.mark.edge_case
    def test_create_report_financial_large_data(self):
        """
        Test that create_report_financial handles large data returned by get_balance_sheet.
        """
        symbol = "AAPL"
        large_balance_sheet = {"assets": 10**9, "liabilities": 10**9}

        with patch('app.utils.financial.get_balance_sheet', return_value=large_balance_sheet):
            result = create_report_financial(symbol)
            assert result == {'balance_sheet': large_balance_sheet}