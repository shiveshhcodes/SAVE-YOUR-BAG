from flask import Flask, render_template, request, send_file
from bs4 import BeautifulSoup
import requests
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)

def get_product_price(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    price = soup.find('span', {'class': 'price'}).text
    return float(price.strip().replace('$', ''))

# Route for home page
@app.route('/')
def index():
    return render_template('index.html')

# Route to add and check product price
@app.route('/check_price', methods=['POST'])
def check_price():
    data = request.get_json()
    url = data['url']
    current_price = get_product_price(url)
    # For demonstration, we create a dummy price history
    price_history = [current_price, current_price + 5, current_price - 3, current_price + 2, current_price - 4]
    # Generate the price history chart
    plt.plot(price_history)
    plt.xlabel('Time')
    plt.ylabel('Price')
    plt.title('Price History')
    # Save the plot to a bytes object
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return {
        'current_price': current_price,
        'price_history_chart': base64.b64encode(buf.getvalue()).decode('utf-8')
    }

if __name__ == '__main__':
    app.run(debug=True)
