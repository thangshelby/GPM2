import pytest
from flask import Flask
from flask.testing import FlaskClient
from server.app.routes.indicator import indicator_bp

# Mocking the get_BB function
from unittest.mock import patch

# Create a test client for the Flask app
@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(indicator_bp)
    with app.test_client() as client:
        yield client

# Describe block for fetch_BB tests
@pytest.mark.describe("fetch_BB function tests")
class TestFetchBB:

    @pytest.mark.happy_path
    def test_fetch_BB_happy_path(self, client):
        """Test fetch_BB with valid ticker and window."""
        with patch('server.app.routes.indicator.get_BB') as mock_get_BB:
            mock_get_BB.return_value = "Mocked BB Data"
            response = client.get('/BB?ticker=AAPL&window=20')
            assert response.status_code == 200
            assert response.data == b"Mocked BB Data"
            mock_get_BB.assert_called_once_with('AAPL', 20)

    @pytest.mark.edge_case
    def test_fetch_BB_missing_ticker(self, client):
        """Test fetch_BB with missing ticker parameter."""
        response = client.get('/BB?window=20')
        assert response.status_code == 400  # Assuming the app returns 400 for bad requests

    @pytest.mark.edge_case
    def test_fetch_BB_missing_window(self, client):
        """Test fetch_BB with missing window parameter."""
        response = client.get('/BB?ticker=AAPL')
        assert response.status_code == 400  # Assuming the app returns 400 for bad requests

    @pytest.mark.edge_case
    def test_fetch_BB_invalid_window(self, client):
        """Test fetch_BB with invalid window parameter (non-integer)."""
        response = client.get('/BB?ticker=AAPL&window=abc')
        assert response.status_code == 400  # Assuming the app returns 400 for bad requests

    @pytest.mark.edge_case
    def test_fetch_BB_invalid_ticker(self, client):
        """Test fetch_BB with an invalid ticker."""
        with patch('server.app.routes.indicator.get_BB') as mock_get_BB:
            mock_get_BB.side_effect = ValueError("Invalid ticker")
            response = client.get('/BB?ticker=INVALID&window=20')
            assert response.status_code == 400  # Assuming the app returns 400 for bad requests
            mock_get_BB.assert_called_once_with('INVALID', 20)

    @pytest.mark.edge_case
    def test_fetch_BB_large_window(self, client):
        """Test fetch_BB with a very large window size."""
        with patch('server.app.routes.indicator.get_BB') as mock_get_BB:
            mock_get_BB.return_value = "Mocked BB Data"
            response = client.get('/BB?ticker=AAPL&window=10000')
            assert response.status_code == 200
            assert response.data == b"Mocked BB Data"
            mock_get_BB.assert_called_once_with('AAPL', 10000)