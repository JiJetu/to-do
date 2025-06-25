import { useEffect, useState } from "react";

export const themItem = {
  Light: "light",
  Dark: "dark",
};

const useTheme = () => {
  const [theme, setTheme] = useState(themItem.Light);

  const handleToggleTheme = () => {
    const html = document.documentElement;

    if (theme === themItem.Light) {
      html.classList.remove(themItem.Light);
      html.classList.add(themItem.Dark);
      setTheme(themItem.Dark);
      localStorage.setItem("theme", themItem.Dark);
    } else {
      html.classList.remove(themItem.Dark);
      html.classList.add(themItem.Light);
      setTheme(themItem.Light);
      localStorage.setItem("theme", themItem.Light);
    }
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || themItem.Light;

    const html = document.documentElement;
    html.classList.add(currentTheme);
    setTheme(currentTheme);
    document.querySelector("html").setAttribute("data-theme", currentTheme);
  }, []);

  return { handleToggleTheme, theme };
};

export default useTheme;

// const [theme, setTheme] = useState(themItem.Light);
// const handleToggle = (e) => {
//   if (e.target.checked) {
//     setTheme(themItem.Dark);
//   } else setTheme(themItem.Light);
// };

// useEffect(() => {
//   localStorage.setItem("theme", theme);
//   const localTheme = localStorage.getItem("theme");

//   document.querySelector("html").setAttribute("data-theme", localTheme);
// }, [theme]);
