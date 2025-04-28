import DropdownMenu from './DropdownMenu';
import GlowCardGrid from './card'

function App() {
  const positions = [
    { x: -100, y: -100, delay: 0 },
    { x: 100, y: -100, delay: 0.2 },
    { x: -100, y: 100, delay: 0.4 },
    { x: 100, y: 100, delay: 0.6 },
  ];
  
  // 卡片內容：圖示和文字
  const cardContents = [
    { icon: "🗡️", label: "寶劍" },
    { icon: "🔮", label: "法杖" },
    { icon: "🪓", label: "斧頭" },
    { icon: "🔨", label: "槌子" },
  ];
  return (
    <>
      <div className="p-3 bg-gray-100">
      <div className="w-full h-auto flex items-center justify-center mb-10 p-3">
        <div className="grid grid-cols-2 gap-6">
          <GlowCardGrid positions={positions} cardContents={cardContents}/>
        </div>
      </div>

        <div className=" flex items-center justify-center">

          <DropdownMenu/>
        </div>
      </div>
    </>
  )
}

export default App
