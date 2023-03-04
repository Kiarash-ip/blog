import React, { useState, useEffect, FC } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Category } from "../types/interfaces";

const Header:FC = () => {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-10 h-10 text-yellow-500 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-10 h-10 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="flex items-center gap-2 border-b w-full inline-block border-gray-500 dark:border-white py-8">
        <div className="block mr-auto">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-gray-700 dark:text-white">
              GraphCmd
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className=" align-middle ml-4 font-semibold cursor-pointer text-gray-700 dark:text-white">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        {renderThemeChanger()}
      </div>
    </div>
  );
}


export default Header