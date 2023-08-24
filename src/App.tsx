import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { motion, useScroll, useTransform } from "framer-motion";

type Data = {
  id: number;
  svgCode: string;
  svgName: string[];
};

function App() {
  const [selectedOption, setSelectedOption] = useState<
    "All" | "Outline" | "Filled"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Data[]>();
  const [searchedData, setSearchedData] = useState<Data[]>();
  const [category, setCategory] = useState("communication");

  useEffect(() => {
    async function getData() {
      await axios
        .get(`/jsons/${category}.json`)
        .then((res) => {
          setData(res.data);
          setSearchedData(res.data);
          setSearchQuery("");
          setSelectedOption("All");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getData();
  }, [category]);

  function renderSvgCode(svgCode: string | null) {
    if (svgCode === null) {
      return null;
    } else {
      return <div dangerouslySetInnerHTML={{ __html: svgCode as string }} />;
    }
  }

  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  }

  const Categories = [
    "communication",
    "weather",
    "maps",
    "objects & tools",
    "devices",
    "camera & photos",
    "gaming",
    "connectivity",
    "Transportation",
    "automation",
    "accessibility",
    "privacy & security",
    "human",
    "home",
    "fitness",
    "nature",
    "editing",
    "text formatting",
    "media",
    "keyboard",
    "commerce",
    "time",
    "health",
    "shapes",
    "arrows",
    "indices",
    "math",
  ];

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [400, 600], [0, 1]);

  return (
    <div className="antialiased font-medium">
      <motion.button
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        style={{ scale }}
        className="fixed duration-300 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center outline outline-1 outline-zinc-400 bg-emerald-200 cursor-pointer rounded-full bottom-3 right-3"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 lg:w-6 lg:h-6"
        >
          <path
            d="M13.8828 25.1367C14.4922 25.1367 14.9258 24.7148 14.9258 24.1055V8.67188L14.8086 5.17969L14.1406 5.41406L18.3477 10.0195L21.0195 12.6445C21.207 12.832 21.4766 12.9258 21.7578 12.9258C22.3438 12.9258 22.7656 12.4805 22.7656 11.9062C22.7656 11.625 22.6719 11.3789 22.4492 11.1445L14.668 3.35156C14.4453 3.11719 14.1758 3 13.8828 3C13.5898 3 13.3203 3.11719 13.0977 3.35156L5.32812 11.1445C5.10547 11.3789 5 11.625 5 11.9062C5 12.4805 5.42188 12.9258 6.00781 12.9258C6.28906 12.9258 6.57031 12.832 6.74609 12.6445L9.41797 10.0195L13.6133 5.41406L12.957 5.17969L12.8398 8.67188V24.1055C12.8398 24.7148 13.2734 25.1367 13.8828 25.1367Z"
            fill="black"
            fillOpacity="0.8"
          />
        </svg>
      </motion.button>

      <div className="bg-gradient-to-t from-emerald-100 via-emerald-100 to-white">
        <h1 className="text-3xl mb-10 font-bold mx-5 md:mx-40 py-10">
          SF-Symbols
        </h1>

        <section className="flex flex-col gap-3 mx-5 md:mx-40">
          <div className="flex items-start gap-1">
            <h2 className="uppercase text-xs text-black/70">Categories</h2>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
            >
              <path
                d="M22.3086 9.41797C22.3086 8.77344 21.8047 8.30469 21.2422 8.30469C20.668 8.30469 20.1875 8.80859 20.1875 9.37109V13.6953L20.3984 19.168L18.4648 16.9883L6.82812 5.35156C6.61719 5.14063 6.35938 5.03516 6.08984 5.03516C5.50391 5.03516 5 5.57422 5 6.13672C5 6.38281 5.11719 6.66406 5.32812 6.875L16.9414 18.5L19.1211 20.4219L13.4023 20.2344H9.32422C8.77344 20.2344 8.26953 20.7148 8.26953 21.2773C8.26953 21.8398 8.71484 22.332 9.37109 22.332H21.1602C21.8633 22.332 22.2969 21.875 22.2969 21.207L22.3086 9.41797Z"
                fill="#00000097"
                fillOpacity="0.85"
              />
            </svg>
          </div>
          <div className="grid grid-flow-col items-center gap-3 w-full pb-4 overflow-x-scroll">
            {Categories.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCategory(item);
                }}
                className={`border border-black/20 px-5 py-1.5 rounded-lg w-max duration-100 ${
                  category !== item && "hover:bg-emerald-400/30"
                } ${category === item ? "bg-emerald-400/80" : "bg-zinc-500/0"}`}
              >
                <span className="capitalize">{item}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="w-full p-5 sticky top-0 flex flex-col lg:flex-row text-zinc-600 mb-3 shadow bg-white md:px-40 lg:px-40">
        <div className="flex items-center w-full">
          <div className="w-5 h-5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2124_88631)">
                <path
                  d="M3 11.3516C3 16.5078 7.19531 20.7031 12.3516 20.7031C14.3906 20.7031 16.2539 20.0469 17.7891 18.9453L23.5547 24.7227C23.8242 24.9922 24.1758 25.1211 24.5508 25.1211C25.3477 25.1211 25.8984 24.5234 25.8984 23.7383C25.8984 23.3633 25.7578 23.0234 25.5117 22.7773L19.7812 17.0117C20.9883 15.4414 21.7031 13.4844 21.7031 11.3516C21.7031 6.19531 17.5078 2 12.3516 2C7.19531 2 3 6.19531 3 11.3516ZM5.00391 11.3516C5.00391 7.29688 8.29688 4.00391 12.3516 4.00391C16.4062 4.00391 19.6992 7.29688 19.6992 11.3516C19.6992 15.4062 16.4062 18.6992 12.3516 18.6992C8.29688 18.6992 5.00391 15.4062 5.00391 11.3516Z"
                  fill="gray"
                  fillOpacity="1"
                />
              </g>
              <defs>
                <clipPath id="clip0_2124_88631">
                  <rect
                    width="22.8984"
                    height="23.1211"
                    fill="white"
                    transform="translate(3 2)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <input
            onChange={(e) => {
              setSearchQuery(e.target.value);
              const query = e.target.value.toLowerCase();
              const filteredData = data?.filter((item) => {
                if (item.svgName[0].includes(query)) return true;

                // for (let i = 0; i < query.length; i++) {
                //   const char = query.charAt(i);

                //   if (item.svgName[0].includes(char)) return true;

                //   if (
                //     item.svgName[0]
                //       .split("-")
                //       .map((e) => e[0])
                //       .includes(char)
                //   ) {
                //     return true;
                //   }
                // }
              });

              console.log(e.target.value);
              console.log(filteredData);

              // if (filteredData?.length === 0) {
              //   const nonFilteredData = data?.filter((item) =>
              //     item.svgName[0].includes("")
              //   );

              //   setData(nonFilteredData);
              // }

              if (query === "") {
                setSearchedData(data);
              } else {
                setSearchedData(filteredData);
              }
            }}
            className="w-full p-3 outline-transparent"
            placeholder="Search all icons ..."
            type="text"
            name="search"
            value={searchQuery}
          />
        </div>

        <div className="flex flex-col text-black mt-2">
          <div className="flex">
            <button
              onClick={() => {
                setSelectedOption("All");
                setSearchedData(data);
              }}
              className={`border border-emerald-200 w-full lg:px-7 rounded-l-md py-1 duration-200 ${
                selectedOption !== "All" && "hover:bg-emerald-100"
              } ${selectedOption === "All" && "bg-emerald-200"}`}
            >
              All
            </button>
            <button
              onClick={() => {
                setSelectedOption("Outline");
                const filteredData = data?.filter(
                  (item) => !item.svgName[0].includes("fill")
                );

                setSearchedData(filteredData);
              }}
              className={`border border-emerald-200 w-full lg:px-7 py-1 duration-200 ${
                selectedOption !== "Outline" && "hover:bg-emerald-100"
              } ${selectedOption === "Outline" && "bg-emerald-200"}`}
            >
              Outline
            </button>
            <button
              onClick={() => {
                setSelectedOption("Filled");
                const filteredData = data?.filter((item) =>
                  item.svgName[0].includes("fill")
                );

                setSearchedData(filteredData);
              }}
              className={`border border-emerald-200 w-full lg:px-7 rounded-r-md py-1 duration-200 ${
                selectedOption !== "Filled" && "hover:bg-emerald-100"
              } ${selectedOption === "Filled" && "bg-emerald-200"}`}
            >
              Filled
            </button>
          </div>
          <h3 className="text-sm mt-5 text-zinc-500 capitalize flex items-center gap-1">
            SF-Symbols{" "}
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
            >
              <path
                d="M19.4609 14.1719C19.4609 13.8789 19.3438 13.6094 19.1211 13.3984L9.83984 4.30469C9.62891 4.10547 9.37109 4 9.06641 4C8.46875 4 8 4.45703 8 5.06641C8 5.35938 8.11719 5.62891 8.30469 5.82812L16.8359 14.1719L8.30469 22.5156C8.11719 22.7148 8 22.9727 8 23.2773C8 23.8867 8.46875 24.3438 9.06641 24.3438C9.37109 24.3438 9.62891 24.2383 9.83984 24.0273L19.1211 14.9453C19.3438 14.7227 19.4609 14.4648 19.4609 14.1719Z"
                fill="rgb(113 113 122)"
              />
            </svg>
            {category} Icons
          </h3>
        </div>
      </section>

      <section className="mx-5 md:mx-40 mt-7 mb-10">
        <section className="grid grid-cols-2 w-full md:grid-cols-4 lg:grid-cols-6 xl:lg:grid-cols-7 justify-items-center content-center place-items-center place-content-center gap-y-7 ">
          {searchedData?.length === 0 && (
            <div className="w-full text-zinc-500 m-auto flex items-center justify-center mt-40 absolute">
              No SF-Symbols for "{searchQuery}"
            </div>
          )}

          {searchedData?.map((file, index) => (
            <div
              className="svgContainer flex flex-col gap-1 lg:gap-2 w-36 xl:w-36 h-auto"
              key={index}
            >
              <div
                onClick={() => {
                  copyTextToClipboard(file.svgCode);
                }}
                className="border hover:border-emerald-400/70 duration-200 rounded-xl cursor-pointer w-36 h-36 xl:w-36 xl:h-36 flex items-center justify-center"
              >
                <div className="w-fit">{renderSvgCode(file.svgCode)}</div>
              </div>
              <p className="text-sm h-10 text-zinc-400 font-medium truncate text-center">
                {file.svgName}
              </p>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default App;
