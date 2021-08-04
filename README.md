# Shared Shopping

## About

Work in progress...

Shared shopping is my first React project where the user can create a list, categorize it if the user wishes to do so and also share it with someone to collaborate on the same list.

## Functionality

- Add items to list, if a a category is selected they will be automatically sorted and if not they will put as uncategorized.
- Categories will record the amount of times clicked to be able to sort by most used.
- Items in categories will automatically be color coded.
- Responsive for both desktop and mobile.
- If the list contains at least one item an edit button will toggle tools to allow for removing and editing of items already in the list.
- Default name of the list can be changed.
- Prompt in green next to input will indicate user that item was successfully added if list is large enough to otherwise go unnoticed.
- Everything is saved to local storage.
- Users can enable sharing and optionally password protect their lists to collaborate with someone.

## Screenshot

<img src="https://user-images.githubusercontent.com/72305598/128172799-01faa1c0-5d6d-4b7f-b327-88a59ec074d4.png" width="200px">

## Categories

- Baby
- Beer, Wine & Spirits
- Beverages
- Bread & Bakery
- Breakfast & Cereal
- Canned Goods & Soups
- Condiments/Spices & Bake
- Cookies, Snacks & Candy
- Dairy, Eggs & Cheese
- Deli & Signature Cafe
- Flowers
- Frozen Foods
- Fruits & Vegetables
- Grains, Pasta & Sides
- International Cuisine
- Meat & Seafood
- Miscellaneous
- Paper Products
- Cleaning Supplies
- Health & Beauty
- Personal Care
- Pet Care
- Pharmacy
- Tobacco

## Installation

```bash
npm install
```

For the backend you will need a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account. Create a `.env` file in the root directory and insert `MONGO_DB=` followed by your connection string.

```bash
# Terminal 1 (frontend)
npm run dev
```

```bash
# Terminal 2 (backend)
npm run database
```
