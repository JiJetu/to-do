import Hero from "../components/Hero";
import wave from "../assets/waves.svg";

const Home = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-65px)]">
      <Hero />
      <img className="absolute bottom-0 w-full" src={wave} alt="wave image" />
    </div>
  );
};

export default Home;
