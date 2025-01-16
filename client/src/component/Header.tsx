import { CiSearch } from "react-icons/ci";
const Header = () => {
  return (
    <div className="w-full flex flex-row justify-between bg-transparent pb-[1rem] pl-[3.2rem]">
      <div className="flex flex-col gap-[1rem] justify-center">
        <div className="flex flex-row gap-[0.8rem] items-center justify-start">
          <div className="flex flex-row items-center gap-x-[0.8rem]">
    {/* <img
    className="w-[4rem] h-[4rem] rounded-full"
    src='./logo.jpg'
    /> */}
          <header className="text-4xl text-white font-bold ">
            New Member
          </header>
          </div>

          <h3 className="text-[1rem] text-secondary font-bold text-start">
            FINANCIAL <br />
            DATA VISUALIZATION
          </h3>
        </div>

        <div
          className="flex flex-row gap-x-[0.8rem] text-secondary border-secondary
          focus:border-blue-200 group group-focus:border-blue-200
        items-center bg-transparen border-[0.05rem]  py-[0.4rem] px-[0.8rem]
        rounded-lg"
        >
          <CiSearch size={14} />

          <input
            placeholder="Search for a stock"
            className="w-[20rem]  bg-transparent text-[1.2rem]
   outline-none text-white"
          />
        </div>
      </div>
      <div className="w-[70rem] h-[10rem]">
        <img
          className="w-full h-full object-cover"
          src="https://media.licdn.com/dms/image/v2/D4E12AQFmHuoZQX7cFA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709658588401?e=2147483647&v=beta&t=2shBxTNFZJ6kQyF5ohqJ9GzwgS4n8vAL5bvJFyDbGCw"
        />
      </div>
    </div>
  );
};

export default Header;
