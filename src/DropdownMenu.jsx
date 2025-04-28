import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const measureRef = useRef(null); // 量寬度的用這個 ref

  const items = ["戰士", "法師", "騎士", "聖騎士"];

  const handleSelect = (item) => {
    setSelectedItem(item);
    setTimeout(() => {
      setIsOpen(false);
    }, 1500); // 延遲300ms後關閉
  };

  // 每次 selectedItem 改變時，量一次文字的寬度
  useEffect(() => {
    if (measureRef.current) {
      setMeasuredWidth(measureRef.current.scrollWidth);
    }
  }, [selectedItem]);

  const displayText = selectedItem ? `您已選擇 : ${selectedItem}` : "請選擇職業";

  return (
    <div className="relative inline-block">
      {/* 隱藏的 span，用來量文字寬度 */}
      <span
        ref={measureRef}
        className="absolute invisible whitespace-nowrap"
      >
        {displayText}
      </span>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-3 rounded-xl shadow-md focus:outline-none flex items-center justify-center overflow-hidden"
      >
        {/* 這裡才是真正畫面上看到的文字，且有動畫 */}
        <motion.div
          key={selectedItem || "default"}
          initial={{ width: 0 }}
          animate={{ width: measuredWidth }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="overflow-hidden inline-block"
        >
          <span className="whitespace-nowrap">
            {displayText}
          </span>
        </motion.div>

        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            opacity: { duration: 0.3, ease: "easeInOut" },
            height: { duration: 0.3, ease: "easeInOut" }
          }}
          className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
            {items.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleSelect(item)}
                whileHover={{ scale: 1.02, backgroundColor: "#f0f0f0" }}
                className={`p-3 cursor-pointer transition-all ${
                  selectedItem === item ? "bg-blue-100 border-4 border-blue-500" : ""
                }`}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
