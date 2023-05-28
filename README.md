# Spinstack Payment System

The Spinstack Payment Protocol is a robust and innovative blockchain-powered payment gateway that harnesses the cutting-edge technology of the RequestNetwork. Designed to facilitate seamless and secure transactions, the Spinstack Payment System offers a range of features and functionalities that make it a versatile solution for businesses and individuals alike.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/GHDECRYPTORS/spinstack_sdk.git
   ```
2. Install dependencies:
   ```
   cd spinstack_sdk
   npm install
   ```
3. Configure Gnosis Request API credentials:
   - Obtain your Gnosis Request API credentials from the Gnosis Developer Portal.
   - Open the `.env` file and update the following values with your credentials:
     ```
     MONGO_URI="mongodb://localhost:27017"
     JWT_SECRET=""
     ENCRYPTION_KEY=""
     REQUEST_URL="https://pay.request.network"
     ```
4. Start the application:
   ```
   npm start
   ```

## Usage

### Create a business

Endpoint: `POST /business`

Example Request:

```bash
curl -X POST
https://spinstack-backend.herokuapp.com/business \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhd3Nvbl90cmVtYmxheUB5YWhvby5jb20iLCJmdWxsX25hbWUiOiJKb25hdGhhbiBNY0N1bGxvdWdoIiwiX2lkIjoiNjQ3MWU0N2JmMmE3MjM1ZDNlODNkYmJkIiwiaWF0IjoxNjg1MTg1NjgyfQ.8VtuREFUKtjcBVIQiBpX3QiKx6taAo6zwm5rN7Ctl6o" \
  -d '{
        "name": "{{$randomCompanyName}}",
        "type": "{{$randomJobType}}"
    }'
```

### Update a business

Endpoint: `PUT /business/:id`

Example Request:

```bash
curl -X PUT
https://spinstack-backend.herokuapp.com/business/1234567890 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhd3Nvbl90cmVtYmxheUB5YWhvby5jb20iLCJmdWxsX25hbWUiOiJKb25hdGhhbiBNY0N1bGxvdWdoIiwiX2lkIjoiNjQ3MWU0N2JmMmE3MjM1ZDNlODNkYmJkIiwiaWF0IjoxNjg1MTg1NjgyfQ.8VtuREFUKtjcBVIQiBpX3QiKx6taAo6zwm5rN7Ctl6o" \
  -d '{
        "name": "{{$randomCompanyName}}",
        "type": "{{$randomJobType}}",
        "webhook_url": "{{$randomUrl}}"
    }'
```

### Delete a business

Endpoint: `DELETE /business/:id`

Example Request:

```bash
curl -X DELETE
https://spinstack-backend.herokuapp.com/business/1234567890 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhd3Nvbl90cmVtYmxheUB5YWhvby5jb20iLCJmdWxsX25hbWUiOiJKb25hdGhhbiBNY0N1bGxvdWdoIiwiX2lkIjoiNjQ3MWU0N2JmMmE3MjM1ZDNlODNkYmJkIiwiaWF0IjoxNjg1MTg1NjgyfQ.8VtuREFUKtjcBVIQiBpX3QiKx6taAo6zwm5rN7Ctl6o"
```

### Get a business

Endpoint: `GET /business/:id`

Example Request:

```bash
curl -X GET
https://spinstack-backend.herokuapp.com/business/1234567890 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhd3Nvbl90cmVtYmxheUB5YWhvby5jb20iLCJmdWxsX25hbWUiOiJKb25hdGhhbiBNY0N1bGxvdWdoIiwiX2lkIjoiNjQ3MWU0N2JmMmE3MjM1ZDNlODNkYmJkIiwiaWF0IjoxNjg1MTg1NjgyfQ.8VtuREFUKtjcBVIQiBpX3QiKx6taAo6zwm5rN7Ctl6o"
```

### Get all business

Endpoint: `GET /business`

Example Request:

```bash
curl -X GET
https://spinstack-backend.herokuapp.com/business \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhd3Nvbl90cmVtYmxheUB5YWhvby5jb20iLCJmdWxsX25hbWUiOiJKb25hdGhhbiBNY0N1bGxvdWdoIiwiX2lkIjoiNjQ3MWU0N2JmMmE3MjM1ZDNlODNkYmJkIiwiaWF0IjoxNjg1MTg1NjgyfQ.8VtuREFUKtjcBVIQiBpX3QiKx6taAo6zwm5rN7Ctl6o"
```

### Create an Order

Endpoint: `POST /order`

Example Request:

```bash
curl -X POST
https://spinstack-backend.herokuapp.com/api/v1/sdk/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer pub-41c31d69-1dcc-4b2c-89b9-2c7e335df4bc" \
  -d '{
        "tx_ref": "33222",
        "amount_in_wei":"8000000000000000000000000000",
        "currency":"ETH",
        "customer_email":"yungdynamic53@gmail.com",
        "customer_name":"David",
        "title":"Payment for gas",
        "description": "description"
    }'
```

### Update an Order

Endpoint: `PUT /order/:orderId`

Example Request:

```bash
curl -X PUT https://spinstack-backend.herokuapp.com/api/v1/sdk/order/1234567890 \
 -H "Authorization: Bearer pub-41c31d69-1dcc-4b2c-89b9-2c7e335df4bc"
```

### GET an Order

Endpoint: `GET /order/:orderId`

Example Request:

```bash
curl -X GET https://spinstack-backend.herokuapp.com/api/v1/sdk/order/1234567890 \
 -H "Authorization: Bearer pub-41c31d69-1dcc-4b2c-89b9-2c7e335df4bc"
```
### GET all Orders

Endpoint: `GET /orders`

Example Request:

```bash
curl -X GET https://spinstack-backend.herokuapp.com/api/v1/sdk/orders \
 -H "Authorization: Bearer pub-41c31d69-1dcc-4b2c-89b9-2c7e335df4bc"
```

## Contributing

Contributions to the Spinstack Payment System are welcome! If you have any suggestions, bug reports, or feature requests, please create an issue in the GitHub repository. If you would like to contribute code, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
