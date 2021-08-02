import React, { useState, useEffect, useRef } from 'react';

import './Category.scss';

const allCategories = [
  { id: 0, name: 'Baby', count: 0 },
  { id: 1, name: 'Beer, Wine & Spirits', count: 0 },
  { id: 2, name: 'Beverages', count: 0 },
  { id: 3, name: 'Bread & Bakery', count: 0 },
  { id: 4, name: 'Breakfast & Cereal', count: 0 },
  { id: 5, name: 'Canned Goods & Soups', count: 0 },
  { id: 6, name: 'Condiments/Spices & Bake', count: 0 },
  { id: 7, name: 'Cookies, Snacks & Candy', count: 0 },
  { id: 8, name: 'Dairy, Eggs & Cheese', count: 0 },
  { id: 9, name: 'Deli & Signature Cafe', count: 0 },
  { id: 10, name: 'Flowers', count: 0 },
  { id: 11, name: 'Frozen Foods', count: 0 },
  { id: 12, name: 'Fruits & Vegetables', count: 0 },
  { id: 13, name: 'Grains, Pasta & Sides', count: 0 },
  { id: 14, name: 'International Cuisine', count: 0 },
  { id: 15, name: 'Meat & Seafood', count: 0 },
  { id: 16, name: 'Miscellaneous', count: 0 },
  { id: 17, name: 'Paper Products', count: 0 },
  { id: 18, name: 'Cleaning Supplies', count: 0 },
  { id: 19, name: 'Health & Beauty', count: 0 },
  { id: 20, name: 'Personal Care', count: 0 },
  { id: 21, name: 'Pet Care', count: 0 },
  { id: 22, name: 'Pharmacy', count: 0 },
  { id: 23, name: 'Tobacco', count: 0 },
];

interface Category {
  selectedCategory: (category: string) => void;
  sortCategory: string;
}

function Category(props: Category) {
  const [categories, setCategories] = useState(() => [
    ...allCategories.slice(0, 5),
    { id: 999, name: '...', count: -1 },
  ]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setCategories((category) => {
      if (props.sortCategory === 'Standard') {
        return [...category].sort((a, b) => a.id - b.id);
      } else {
        category.sort((a, b) => a.count - b.count);
        return [...category].reverse();
      }
    });
  }, [props.sortCategory]);

  function handleCategory(name: string) {
    if (!name.includes('...')) {
      props.selectedCategory(name);
      setCategories((category) => {
        const item = category.find((x) => x.name === name);
        if (item) item.count++;
        return category;
      });
    } else {
      const newCategories = allCategories.slice(categories.length - 1, categories.length + 4);

      if (!newCategories.length) return;
      setCategories((category) => {
        let categories = [...category];
        categories.pop();

        categories = [...categories, ...newCategories];

        const id = allCategories[allCategories.length - 1].id;
        if (!categories.find((x) => x.id === id)) {
          categories.push({ id: 999, name: '...', count: -1 });
        }
        return categories;
      });
    }
  }

  return (
    <section className="Category-section">
      {categories.map((category) => (
        <div className="chip" key={category.id} onClick={() => handleCategory(category.name)}>
          {category.name}
        </div>
      ))}
    </section>
  );
}

export default Category;
export { allCategories };
