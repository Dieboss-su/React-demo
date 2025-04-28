import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// 每張卡片初始進場的位移方向與延遲


// 卡片內容：圖示和文字


// 初始卡片滑入動畫
const cardVariants = {
  hidden: (custom) => ({
    x: custom.x,
    y: custom.y,
    opacity: 0,
    scale: 0.8,
  }),
  visible: (custom) => ({
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 25,
      delay: custom.delay,
    },
  }),
  exit: {
    opacity: 0,
    scale: 1,
    transition: { duration: 1 },
  },
};

// 被點擊的卡片展開到中央的動畫
const getClickedVariant = (origin) => ({
  initial: {
    top: origin?.top,
    left: origin?.left,
    width: origin?.width,
    height: origin?.height,
    position: "fixed",
    scale: 1,
    opacity: 1,
  },
  animate: {
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    width: 160,
    height: 224,
    scale: 1.5,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      delay: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
});

export default function GlowCardGrid({positions,cardContents}) {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedCardPos, setClickedCardPos] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null); // 追蹤滑鼠懸停

  return (
    <>
        <AnimatePresence
          onExitComplete={() => {
            setIsAnimating(false);
          }}
        >
          {positions.map((pos, index) => {
            const isSelected = clickedIndex === index;
            const content = cardContents[index];

            if (clickedIndex !== null && !isSelected) return null;

            return isSelected ? (
              <motion.div
                key={`selected-${index}`}
                className="relative shadow-xl rounded-2xl flex flex-col items-center justify-center text-xl font-bold text-white z-50 cursor-pointer overflow-hidden"
                style={{
                  backgroundColor: "#BF9958",
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={getClickedVariant(clickedCardPos)}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setClickedIndex(null);
                  setClickedCardPos(null);
                }}
                onAnimationComplete={() => {
                  setIsAnimating(false);
                }}
              >
                {/* 流光效果（點擊展開） */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-4 border-transparent"
                  animate={{
                    backgroundSize: hoveredIndex === index ? "200% 200%" : "300% 300%",
                    opacity: hoveredIndex === index ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background:
                      "linear-gradient(45deg, #ffffff 0%, #ffffff00 40%, #ffffff00 60%, #ffffff 100%)",
                    backgroundSize: "300% 300%",
                    animation: "flowLight 3s linear infinite",
                    maskImage: "linear-gradient(black, black)",
                    WebkitMaskImage: "linear-gradient(black, black)",
                  }}
                ></motion.div>

                <div className="text-6xl mb-4 z-10">{content.icon}</div>
                <button className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-200 transition z-10">
                  選擇{content.label}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`card-${index}`}
                className="relative w-40 h-56 bg-white shadow-xl rounded-2xl flex flex-col items-center justify-center text-xl font-semibold cursor-pointer overflow-hidden"
                custom={pos}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => {
                  if (isAnimating) return;

                  const rect = e.currentTarget.getBoundingClientRect();
                  setClickedCardPos({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                  });

                  setClickedIndex(index);
                  setIsAnimating(true);
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onAnimationComplete={() => {
                  if (clickedIndex === null) {
                    setIsAnimating(false);
                  }
                }}
              >
                {/* 流光效果（一般狀態） */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-4 border-transparent"
                  animate={{
                    backgroundSize: hoveredIndex === index ? "200% 200%" : "300% 300%",
                    opacity: hoveredIndex === index ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background:
                      "linear-gradient(45deg, #4fc3f7 0%, #ffffff00 40%, #ffffff00 60%, #4fc3f7 100%)",
                    backgroundSize: "300% 300%",
                    animation: "flowLight 3s linear infinite",
                    maskImage: "linear-gradient(black, black)",
                    WebkitMaskImage: "linear-gradient(black, black)",
                  }}
                ></motion.div>

                <div className="text-5xl mb-4 z-10">{content.icon}</div>
                <button className="px-3 py-1 bg-blue-400 text-white rounded-md shadow hover:bg-blue-500 transition z-10">
                  選擇{content.label}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      

      {/* 加上流光的 keyframes 動畫 */}
      <style>
        {`
          @keyframes flowLight {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      </>
  );
}
