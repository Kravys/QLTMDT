order ex : 
{
  "user_id": 1,
  "total_price": 150.50,
  "payment_method": "COD",
  "delivery_status": "pending",
  "address": "123 Main Street",
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 100
    },
    {
      "product_id": 2,
      "quantity": 1,
      "price": 50.50
    }
  ]
}

create Product ex :
{
    "id": "3",
    "name": "Laptop ABC",
    "price": 1200.50,
    "quantity": 10,
    "description": "High-end laptop",
    "category": 1,
    "status": "available"
}
Update Products ex :
{
    "name": "Updated Laptop ABC",
    "price": 1100.00,
    "quantity": 5,
    "description": "Updated description",
    "category": 2,
    "status": "available"
}
