import React from "react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { BookContext } from "../context/BookProvider.jsx";

const Menu = () => {
  const { selectedCategory, setSelectedCategory, categories } =
    useContext(BookContext);

  return (
    <div className="flex flex-col gap-4 md:w-1/5 p-2 w-full">
      <p className="font-semibold">Categories</p>

      <div className="flex md:flex-col w-full pl-4 flex-row overflow-x-auto gap-2 md:gap-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "destructive" : "ghost"}
            className="justify-start md:w-full"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
