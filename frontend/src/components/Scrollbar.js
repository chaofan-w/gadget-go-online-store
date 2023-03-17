import * as React from "react";
import "../themes/Scrollbar.css";

function Scrollbar({ children }) {
  const [isScrollbarVisible, setIsScrollbarVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const isScrollingDown =
        scrollTop > 0 && scrollTop + clientHeight < scrollHeight;

      setIsScrollbarVisible(isScrollingDown);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`overlay ${isScrollbarVisible ? "scrollbar-visible" : ""}`}>
      {children}
    </div>
  );
}

export default Scrollbar;
