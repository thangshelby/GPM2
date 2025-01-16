import pytest
import pandas as pd
from unittest.mock import patch, mock_open
from server.app.database.model import DbModel

@pytest.mark.describe("Tests for get_df method in DbModel")
class TestGetDf:
    
    @pytest.mark.happy_path
    def test_get_df_happy_path(self):
        """
        Test that get_df correctly reads a well-formed file and returns a DataFrame
        with the expected columns and no null values.
        """
        mock_data = "Date\tOpen\tLow\tHigh\tClose\tVolume\n2023-01-01\t100\t90\t110\t105\t1000\n"
        with patch("builtins.open", mock_open(read_data=mock_data)):
            with patch("pandas.read_csv") as mock_read_csv:
                mock_read_csv.return_value = pd.read_csv(mock_open(read_data=mock_data)())
                db_model = DbModel()
                df = db_model.get_df("AAA")
                assert not df.isnull().values.any(), "DataFrame should not contain null values"
                assert list(df.columns) == ['Date', 'Open', 'Low', 'High', 'Close', 'Volume'], "DataFrame columns mismatch"

    @pytest.mark.edge_case
    def test_get_df_empty_file(self):
        """
        Test that get_df handles an empty file gracefully by returning an empty DataFrame.
        """
        mock_data = ""
        with patch("builtins.open", mock_open(read_data=mock_data)):
            with patch("pandas.read_csv") as mock_read_csv:
                mock_read_csv.return_value = pd.read_csv(mock_open(read_data=mock_data)())
                db_model = DbModel()
                df = db_model.get_df("AAA")
                assert df.empty, "DataFrame should be empty for an empty file"

    @pytest.mark.edge_case
    def test_get_df_missing_columns(self):
        """
        Test that get_df raises an error when the file is missing expected columns.
        """
        mock_data = "Date\tOpen\tLow\tHigh\n2023-01-01\t100\t90\t110\n"
        with patch("builtins.open", mock_open(read_data=mock_data)):
            with patch("pandas.read_csv") as mock_read_csv:
                mock_read_csv.return_value = pd.read_csv(mock_open(read_data=mock_data)())
                db_model = DbModel()
                with pytest.raises(ValueError, match="DataFrame columns mismatch"):
                    df = db_model.get_df("AAA")

    @pytest.mark.edge_case
    def test_get_df_with_null_values(self):
        """
        Test that get_df correctly drops rows with null values.
        """
        mock_data = "Date\tOpen\tLow\tHigh\tClose\tVolume\n2023-01-01\t100\t90\t110\t105\t1000\n2023-01-02\t\t90\t110\t105\t1000\n"
        with patch("builtins.open", mock_open(read_data=mock_data)):
            with patch("pandas.read_csv") as mock_read_csv:
                mock_read_csv.return_value = pd.read_csv(mock_open(read_data=mock_data)())
                db_model = DbModel()
                df = db_model.get_df("AAA")
                assert df.shape[0] == 1, "DataFrame should drop rows with null values"

    @pytest.mark.edge_case
    def test_get_df_file_not_found(self):
        """
        Test that get_df raises a FileNotFoundError when the file does not exist.
        """
        with patch("pandas.read_csv", side_effect=FileNotFoundError):
            db_model = DbModel()
            with pytest.raises(FileNotFoundError):
                df = db_model.get_df("AAA")