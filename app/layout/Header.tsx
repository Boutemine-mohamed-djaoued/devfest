import { IoPersonSharp } from "react-icons/io5";
const Header = () => {
  return (
    <header className="w-full py-5 flex justify-between items-center">
      <div className="text-500 text-blue-500 font-semibold">Network Tracking</div>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-black p-1"><IoPersonSharp className="text-white"/></div>
        Ayout Kazar
      </div>
    </header>
  );
};
export default Header;
