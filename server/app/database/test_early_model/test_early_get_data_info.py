import pytest
import pandas as pd
from unittest.mock import patch, MagicMock
from server.app.database.model import DbModel

@pytest.fixture
def mock_data_info():
    # Mock data to simulate the Excel file content
    return pd.DataFrame({
        'RIC': ['AAA.HM', 'BBB.HM', 'CCC.HM'],
        'Symbol': ['VT:AAA', 'VT:BBB', 'VT:CCC'],
        'OtherInfo': ['Info1', 'Info2', 'Info3']
    })

@pytest.fixture
def db_model():
    return DbModel()

@pytest.mark.describe("Tests for get_data_info method")
class TestGetDataInfo:

    @pytest.mark.happy_path
    def test_get_data_info_valid_ric(self, db_model, mock_data_info):
        """Test that get_data_info returns correct data for a valid RIC."""
        with patch('pandas.read_excel', return_value=mock_data_info):
            result = db_model.get_data_info('AAA')
            assert not result.empty
            assert result.iloc[0]['RIC'] == 'AAA.HM'

    @pytest.mark.happy_path
    def test_get_data_info_valid_symbol(self, db_model, mock_data_info):
        """Test that get_data_info returns correct data for a valid Symbol."""
        with patch('pandas.read_excel', return_value=mock_data_info):
            result = db_model.get_data_info('AAA')
            assert not result.empty
            assert result.iloc[0]['Symbol'] == 'VT:AAA'

    @pytest.mark.edge_case
    def test_get_data_info_invalid_ric(self, db_model, mock_data_info):
        """Test that get_data_info returns empty DataFrame for an invalid RIC."""
        with patch('pandas.read_excel', return_value=mock_data_info):
            result = db_model.get_data_info('ZZZ')
            assert result.empty

    @pytest.mark.edge_case
    def test_get_data_info_case_sensitivity(self, db_model, mock_data_info):
        """Test that get_data_info is case-sensitive and returns empty DataFrame for incorrect case."""
        with patch('pandas.read_excel', return_value=mock_data_info):
            result = db_model.get_data_info('aaa')
            assert result.empty

    @pytest.mark.edge_case
    def test_get_data_info_empty_excel(self, db_model):
        """Test that get_data_info handles an empty Excel file gracefully."""
        with patch('pandas.read_excel', return_value=pd.DataFrame()):
            result = db_model.get_data_info('AAA')
            assert result.empty

    @pytest.mark.edge_case
    def test_get_data_info_no_matching_symbol(self, db_model, mock_data_info):
        """Test that get_data_info returns empty DataFrame when no matching Symbol is found."""
        with patch('pandas.read_excel', return_value=mock_data_info):
            result = db_model.get_data_info('DDD')
            assert result.empty