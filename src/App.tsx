import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { motion, useScroll, useTransform } from "framer-motion";

type Data = {
  id: number;
  svgCode: string;
  svgName: string[];
};

const mockData = [
  {
    id: 1,
    svgCode: "",
    svgName: [""],
  },
  {
    id: 2,
    svgCode: "",
    svgName: [""],
  },
  {
    id: 3,
    svgCode: "",
    svgName: [""],
  },
  {
    id: 4,
    svgCode: "",
    svgName: [""],
  },
  {
    id: 5,
    svgCode: "",
    svgName: [""],
  },
  {
    id: 6,
    svgCode: "",
    svgName: [""],
  },
];

function App() {
  const [data, setData] = useState<Data[]>();
  const [searchedData, setSearchedData] = useState<Data[]>();
  const [filteredData, setFilteredData] = useState<Data[]>();

  const [selectedOption, setSelectedOption] = useState<
    "All" | "Outline" | "Filled"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [category, setCategory] = useState("arrows");

  const [copied, setCopied] = useState<{ isCopied: boolean; name: string }>({
    isCopied: false,
    name: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setData(mockData);
      setSearchedData(mockData);
      setFilteredData(mockData);
      await axios
        .get(
          `https://lktiktfqfsppoevfxkla.supabase.co/storage/v1/object/public/svgs/sf-symbols/${category}.json`
        )
        .then((res) => {
          setData(res.data);
          setSearchedData(res.data);
          setFilteredData(res.data);
          setSearchQuery("");
          setSelectedOption("All");
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
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

  async function copyTextToClipboard(text: string, name: string) {
    try {
      await navigator.clipboard.writeText(text);

      setCopied({ isCopied: true, name });

      setTimeout(() => {
        setCopied({ isCopied: false, name });
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }

  const Categories = [
    "arrows",
    "communication",
    "privacy & security",
    "weather",
    "maps",
    "time",
    "health",
    "shapes",
    "objects & tools",
    "human",
    "devices",
    "camera & photos",
    "gaming",
    "connectivity",
    "transportation",
    "automation",
    "accessibility",
    "home",
    "fitness",
    "nature",
    "editing",
    "media",
    "keyboard",
    "commerce",
    "indices",
    "math",
    "text formatting",
  ];

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [400, 600], [0, 1]);

  return (
    <div className="antialiased font-medium">
      <img
        className="w-96 h-96 absolute -z-0 lg:top-16 top-40 lg:right-40 right-0 lg:scale-110 scale-[0.8] origin-bottom"
        src="/images/bgImage.webp"
        alt="dashed SF-Symbols logo as the background image"
      />

      <section className="bg-gradient-to-t from-teal-100 to-white">
        <header className="flex items-center relative justify-between mx-5 md:mx-20 lg:mx-40 my-10">
          <div className="flex items-center gap-3">
            <img
              src="/images/SF-Symbols.png"
              alt="SF-Symbols Logo"
              className="w-9 h-9 md:h-10 md:w-10 lg:w-11 lg:h-11"
            />
            <h1 className="text-2xl lg:text-3xl font-bold">SF-Symbols</h1>
          </div>
        </header>

        <div className="mb-32 mx-5 md:mx-20 lg:mx-40 flex flex-col gap-1.5 text-zinc-600 text-sm relative">
          <div className="flex flex-wrap gap-2">
            <p>5000+ Symbols</p> - <p>React Compatible</p> -
            <div>
              Code by{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.sinasparkn.pro/"
                className="hover:text-[#FF2A17] duration-200"
              >
                Sina Sparkn
              </a>
            </div>
          </div>
          <div className="flex gap-2.5 items-center mt-2">
            <a
              href="https://github.com/sina-sparkn/SF-Symbols-Icons"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-teal-200 duration-200 flex w-fit items-center gap-2 border border-zinc-300 rounded-lg px-5 py-2 text-zinc-900 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 496 512"
                className="w-5 h-5"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
              Give it a Star
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.figma.com/community/file/886999666531731323"
              className="hover:bg-teal-200 duration-200 flex w-fit items-center gap-2 border border-zinc-300 rounded-lg px-5 py-2 text-zinc-900 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                className="w-4 h-4"
              >
                <path d="M14 95.7924C14 42.8877 56.8878 0 109.793 0H274.161C327.066 0 369.954 42.8877 369.954 95.7924C369.954 129.292 352.758 158.776 326.711 175.897C352.758 193.019 369.954 222.502 369.954 256.002C369.954 308.907 327.066 351.795 274.161 351.795H272.081C247.279 351.795 224.678 342.369 207.666 326.904V415.167C207.666 468.777 163.657 512 110.309 512C57.5361 512 14 469.243 14 416.207C14 382.709 31.1945 353.227 57.2392 336.105C31.1945 318.983 14 289.5 14 256.002C14 222.502 31.196 193.019 57.2425 175.897C31.196 158.776 14 129.292 14 95.7924ZM176.288 191.587H109.793C74.2172 191.587 45.3778 220.427 45.3778 256.002C45.3778 291.44 73.9948 320.194 109.381 320.416C109.518 320.415 109.655 320.415 109.793 320.415H176.288V191.587ZM207.666 256.002C207.666 291.577 236.505 320.417 272.081 320.417H274.161C309.737 320.417 338.576 291.577 338.576 256.002C338.576 220.427 309.737 191.587 274.161 191.587H272.081C236.505 191.587 207.666 220.427 207.666 256.002ZM109.793 351.795C109.655 351.795 109.518 351.794 109.381 351.794C73.9948 352.015 45.3778 380.769 45.3778 416.207C45.3778 451.652 74.6025 480.622 110.309 480.622C146.591 480.622 176.288 451.186 176.288 415.167V351.795H109.793ZM109.793 31.3778C74.2172 31.3778 45.3778 60.2173 45.3778 95.7924C45.3778 131.368 74.2172 160.207 109.793 160.207H176.288V31.3778H109.793ZM207.666 160.207H274.161C309.737 160.207 338.576 131.368 338.576 95.7924C338.576 60.2173 309.737 31.3778 274.161 31.3778H207.666V160.207Z" />
              </svg>
              Get figma file
            </a>
          </div>
        </div>

        <section className="flex flex-col gap-3 mx-5 md:mx-20 lg:mx-40 relative">
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

          <div className="relative">
            <div className="absolute w-10 h-10 bg-gradient-to-l from-teal-100 to-transparent right-0 top-0" />
            <ul className="grid grid-flow-col items-center gap-3 w-full pb-4 overflow-x-scroll">
              {Categories.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setCategory(item);
                  }}
                  className={`border cursor-pointer border-black/20 px-5 py-1.5 rounded-lg w-max duration-100 ${
                    category !== item && "hover:bg-teal-400/30"
                  } ${category === item ? "bg-teal-400/60" : "bg-teal-100"}`}
                >
                  <span className="capitalize">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>

      <section className="searchF z-50 w-full sticky h-full -top-1">
        <section className="w-full h-full p-5 flex flex-col lg:flex-row lg:items-center text-zinc-600 mb-3 shadow bg-white md:px-20 lg:px-40">
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
                });

                if (query === "") {
                  setSearchedData(data);
                  setFilteredData(data);
                } else {
                  setSearchedData(filteredData);
                  setFilteredData(filteredData);
                }
              }}
              className="w-full p-3 py-2.5 outline-transparent"
              placeholder={`Search ${category} symbols ...`}
              type="text"
              name="search"
              value={searchQuery}
            />
          </div>

          <div className="flex flex-col text-black mt-2 lg:mt-0">
            <div className="flex">
              <button
                onClick={() => {
                  setSelectedOption("All");
                  setFilteredData(searchedData);
                }}
                className={`border border-teal-200 w-full lg:px-7 rounded-l-lg py-2 duration-200 ${
                  selectedOption !== "All" && "hover:bg-teal-100"
                } ${selectedOption === "All" && "bg-teal-100 text-teal-500"}`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setSelectedOption("Outline");
                  const filteredData = searchedData?.filter(
                    (item) => !item.svgName[0].includes("fill")
                  );

                  setFilteredData(filteredData);
                }}
                className={`border border-teal-200 w-full lg:px-7 py-2 duration-200 ${
                  selectedOption !== "Outline" && "hover:bg-teal-100"
                } ${
                  selectedOption === "Outline" && "bg-teal-100 text-teal-500"
                }`}
              >
                Outline
              </button>
              <button
                onClick={() => {
                  setSelectedOption("Filled");
                  const filteredData = searchedData?.filter((item) =>
                    item.svgName[0].includes("fill")
                  );

                  setFilteredData(filteredData);
                }}
                className={`border border-teal-200 w-full lg:px-7 rounded-r-lg py-2 duration-200 ${
                  selectedOption !== "Filled" && "hover:bg-teal-100"
                } ${
                  selectedOption === "Filled" && "bg-teal-100 text-teal-500"
                }`}
              >
                Filled
              </button>
            </div>
          </div>
        </section>
      </section>

      <section className="mx-5 md:mx-20 lg:mx-40 mt-12 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 w-full md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 justify-items-center content-center place-items-center place-content-center gap-y-7">
          {filteredData?.length === 0 && (
            <div className="w-full text-zinc-500  flex items-center justify-center mt-5 mb-2 absolute">
              No SF-Symbols for "{searchQuery}"
            </div>
          )}

          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="capitalize p-1.5 text-lg text-center bg-teal-100 duration-200 rounded-xl w-36 h-36 xl:w-36 xl:h-36 flex items-center justify-center">
              {category}
            </h3>
            <div className="h-10 mt-1.5" />
          </motion.div>

          {filteredData?.map((file, index) => (
            <div
              className="Container flex flex-col gap-1 lg:gap-2 w-36 xl:w-36 h-auto"
              key={index}
            >
              {!loading ? (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="svgContainer border relative overflow-hidden duration-200 rounded-xl w-36 h-36 xl:w-36 xl:h-36 flex items-center justify-center">
                    <button
                      onClick={() => {
                        copyTextToClipboard(file.svgCode, file.svgName[0]);
                      }}
                      className="CopyButton absolute w-full h-1/2 bottom-0 flex items-center justify-center p-1"
                    >
                      <p className=" text-sm font-bold text-zinc-500  bg-zinc-200/30 hover:bg-teal-400/40 hover:text-zinc-800 w-full h-full rounded-lg flex items-center justify-center">
                        {copied.isCopied && copied.name === file.svgName[0]
                          ? "Copied!"
                          : "Copy JSX"}
                      </p>
                    </button>
                    <div className="w-fit svgs">
                      {renderSvgCode(file.svgCode)}
                    </div>
                  </div>
                  <p className="text-sm h-10 text-zinc-400 font-medium truncate text-center mt-1.5">
                    {file.svgName}
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="svgContainer bg-slate-100 relative overflow-hidden duration-200 rounded-xl w-36 h-36 xl:w-36 xl:h-36 flex items-center justify-center"></div>
                  <div className="svgContainer bg-slate-100 relative overflow-hidden duration-200 rounded-xl w-36 h-5 xl:w-36 xl:h-5 mt-1 flex items-center justify-center"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr />
      <footer className="mt-10 mb-20 mx-5 md:mx-40 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <img
            className="w-5 h-5 hover:rotate-90 duration-300"
            src="/images/rounded-logo.svg"
            alt="Sina Sparkn Logo"
          />
          <a
            href="https://www.sinasparkn.pro/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code by{" "}
            <span className="hover:text-[#FF2A17] duration-200 font-semibold">
              Sina Sparkn
            </span>
          </a>
        </div>
        <div className="text-xs w-1/3 text-center">
          <span className="ml-1">Only Symbols Under</span>{" "}
          <a
            className="underline underline-offset-2 hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://creativecommons.org/licenses/by/4.0/"
          >
            CC BY 4.0 License
          </a>
        </div>
      </footer>

      <motion.button
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        style={{ scale }}
        className="fixed duration-300 w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center outline outline-1 outline-zinc-400 bg-teal-200 cursor-pointer rounded-full bottom-3 right-3"
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
    </div>
  );
}

export default App;
