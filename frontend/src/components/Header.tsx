import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white flex justify-between items-center px-4 z-50 border-b">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="로고"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex items-center">
        <button className="relative p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
