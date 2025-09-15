import background from './image.png'

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full text-white">
      {/* Background image */}
      <img
        src={background}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Dark + Blur Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10"></div>

      {/* Content wrapper */}
      <div className="flex flex-col items-center pt-24 px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-6xl">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
