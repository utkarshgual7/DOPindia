import React from "react";
import { useSelector } from "react-redux";

const WelcomeSection = () => {
  const currentClient = useSelector((state) => state.client.currentClient);

  return (
    <section className="self-stretch mt-14 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
          <div className="grow py-7 pr-20 pl-10 mt-2 w-full bg-white rounded-2xl max-md:px-5 max-md:mt-5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-start self-stretch my-auto font-bold text-red-900 max-md:mt-10 max-md:max-w-full">
                  {currentClient ? (
                    <>
                      <h2 className="text-4xl leading-9">
                        Welcome back 👋 <br /> {currentClient.firstName}
                      </h2>
                      <p className="self-stretch mt-9 text-base leading-none max-md:max-w-full">
                        From Letters to Parcels, We've Got Your Shipping
                        Covered!
                      </p>
                      <a href="/bookservice">
                        <button className="px-11 py-1.5 mt-10 text-xl leading-tight text-center text-white bg-red-800 rounded-lg max-md:px-5">
                          Book Now
                        </button>
                      </a>
                    </>
                  ) : (
                    <>
                      <h2 className="text-4xl leading-9">Register now</h2>
                      <p className="self-stretch mt-9 text-base leading-none max-md:max-w-full">
                        Take advantage of efficient and safe shipping!
                      </p>
                      <a href="/signup">
                        <button className="px-11 py-1.5 mt-10 text-xl leading-tight text-center text-white bg-red-800 rounded-lg max-md:px-5">
                          Register
                        </button>
                      </a>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
                <div className="flex overflow-hidden relative flex-col grow justify-center py-8 aspect-[1.233] max-md:mt-10 max-md:hidden">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2984a37e0c0d13ca43b28e5f103ed2beeb279be8c61969482a39a8a867bbbb1?placeholderIfAbsent=true&apiKey=6c2297f39c3644869211fbde5d1d4f30"
                    alt=""
                    className="object-cover  absolute inset-0 size-full"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/25cf01d49e8e57603d0920958b0ac4fa2882fef1357f614b072bbbed43b8a049?placeholderIfAbsent=true&apiKey=6c2297f39c3644869211fbde5d1d4f30"
                    alt="Decorative element"
                    className="object-contain w-full aspect-[1.75] max-md:mr-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[41%] max-md:hidden max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d70e7ca00d516610bf46f437f2054db0afb4588a1d189f7eee6dbd5644d3ec0?placeholderIfAbsent=true&apiKey=6c2297f39c3644869211fbde5d1d4f30"
            alt="Promotional banner"
            className="object-contain grow w-full aspect-[2.63] rounded-[39px] max-md:mt-3.5 max-md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
