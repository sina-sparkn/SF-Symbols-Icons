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
  {
    id: 7,
    svgCode: "",
    svgName: [""],
  },
  {
    id: 8,
    svgCode: "",
    svgName: [""],
  },
  {
    id: 9,
    svgCode: "",
    svgName: [""],
  },
  {
    id: 10,
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
  const scale = useTransform(scrollY, [400, 410], [0, 1]);

  return (
    <div className="antialiased font-medium">
      <img
        className="bgImage w-96 h-96 hidden lg:block absolute -z-0 lg:top-16 top-[4.8rem] lg:right-40 right-0 lg:scale-110 scale-[0.60] origin-bottom"
        src="/images/bgImage.webp"
        alt="dashed SF-Symbols logo as the background image"
      />

      <section className="bg-gradient-to-t from-teal-100 to-white">
        <header className="flex items-center relative justify-between mx-5 md:mx-20 lg:mx-40 my-10">
          <a
            href="https://sf-symbols.vercel.app"
            className="flex items-center gap-3 relative"
          >
            <div className="absolute bg-transparent rounded-xl w-full h-full" />
            <img
              src="/images/SF-Symbols.png"
              alt="SF-Symbols Logo"
              className="h-10 w-10 lg:w-11 lg:h-11"
            />
            <h1 className="text-3xl font-bold">SF-Symbols</h1>
          </a>
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
                  className={`cursor-pointer border border-teal-400 px-5 py-1.5 rounded-lg w-max duration-150 ${
                    category !== item && "hover:bg-teal-200"
                  } ${category === item ? "bg-teal-200 " : ""}`}
                >
                  <span
                    className={`capitalize ${
                      category === item && "text-teal-700"
                    }`}
                  >
                    {item}
                  </span>
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
        <div
          className={`grid ${
            filteredData?.length === 0
              ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1"
              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
          } w-full justify-items-center content-center place-items-center place-content-center gap-y-7`}
        >
          {filteredData?.length === 0 && (
            <div className="w-full m-auto text-zinc-500 flex flex-col gap-4 items-center justify-center mt-5 mb-2 h-48 text-center">
              <svg
                className="w-7 h-7"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.20948 24.4712H9.74073C9.98682 24.4712 10.1626 24.5415 10.3384 24.7173L12.1431 26.5103C13.6196 27.9985 14.9907 27.9868 16.4673 26.5103L18.272 24.7173C18.4478 24.5415 18.6235 24.4712 18.8696 24.4712H21.4009C23.4985 24.4712 24.4712 23.5103 24.4712 21.4009V18.8696C24.4712 18.6235 24.5415 18.4595 24.7173 18.272L26.4985 16.4673C27.9868 14.9907 27.9751 13.6314 26.4985 12.1431L24.7173 10.3384C24.5415 10.1626 24.4712 9.98682 24.4712 9.75245V7.20948C24.4712 5.12354 23.5103 4.13916 21.4009 4.13916H18.8696C18.6235 4.13916 18.4478 4.08057 18.272 3.90479L16.4673 2.11182C14.9907 0.623539 13.6196 0.635258 12.1431 2.11182L10.3384 3.90479C10.1626 4.08057 9.98682 4.13916 9.74073 4.13916H7.20948C5.11182 4.13916 4.13916 5.1001 4.13916 7.20948V9.75245C4.13916 9.98682 4.08057 10.1626 3.90479 10.3384L2.11182 12.1431C0.623539 13.6314 0.635258 14.9907 2.11182 16.4673L3.90479 18.272C4.08057 18.4595 4.13916 18.6235 4.13916 18.8696V21.4009C4.13916 23.4985 5.11182 24.4712 7.20948 24.4712ZM7.20948 22.6079C6.16651 22.6079 6.00245 22.4439 6.00245 21.4009V18.2485C6.00245 17.897 5.89698 17.6274 5.63916 17.3696L3.42432 15.1665C2.68604 14.4165 2.68604 14.2056 3.42432 13.4556L5.63916 11.2524C5.89698 10.9946 6.00245 10.7251 6.00245 10.3618V7.20948C6.00245 6.15479 6.15479 6.00245 7.20948 6.00245H10.3618C10.7251 6.00245 10.9946 5.9087 11.2524 5.63916L13.4556 3.42432C14.2056 2.68604 14.4165 2.68604 15.1548 3.42432L17.3696 5.63916C17.6157 5.9087 17.897 6.00245 18.2485 6.00245H21.4009C22.4439 6.00245 22.6079 6.16651 22.6079 7.20948V10.3618C22.6079 10.7251 22.7251 10.9946 22.9829 11.2524L25.1978 13.4556C25.936 14.2056 25.936 14.4165 25.1978 15.1665L22.9829 17.3696C22.7251 17.6274 22.6079 17.897 22.6079 18.2485V21.4009C22.6079 22.4439 22.4439 22.6079 21.4009 22.6079H18.2485C17.897 22.6079 17.6157 22.7134 17.3696 22.9829L15.1548 25.1978C14.4165 25.936 14.2056 25.936 13.4556 25.1978L11.2524 22.9829C10.9946 22.7134 10.7251 22.6079 10.3618 22.6079H7.20948Z"
                  fill="currentColor"
                />
                <path
                  d="M10.3154 19.2681C10.585 19.2681 10.8193 19.1626 10.9951 18.9751L14.3115 15.647L17.6514 18.9751C17.8272 19.1509 18.0498 19.2681 18.3194 19.2681C18.835 19.2681 19.2569 18.8345 19.2569 18.3189C19.2569 18.0493 19.1631 17.8384 18.9756 17.6509L15.6475 14.3228L18.9873 10.9712C19.1865 10.772 19.2686 10.5728 19.2686 10.3149C19.2686 9.78759 18.8467 9.37744 18.3311 9.37744C18.085 9.37744 17.8858 9.47119 17.6865 9.6704L14.3115 13.0103L10.9717 9.68212C10.7959 9.49462 10.585 9.40087 10.3154 9.40087C9.7998 9.40087 9.37793 9.79931 9.37793 10.3267C9.37793 10.5845 9.48339 10.8071 9.65918 10.9829L12.9873 14.3228L9.65918 17.6626C9.48339 17.8384 9.37793 18.061 9.37793 18.3189C9.37793 18.8345 9.7998 19.2681 10.3154 19.2681Z"
                  fill="currentColor"
                />
              </svg>
              no SF-Symbols for "{searchQuery}"
            </div>
          )}

          {filteredData?.length !== 0 && (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="capitalize p-1.5 text-lg text-center font-semibold duration-200 rounded-xl w-36 h-36 xl:w-36 xl:h-36 flex items-center justify-center">
                {category}
              </h3>
              <div className="h-10 mt-1.5" />
            </motion.div>
          )}

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
                  <div className="svgContainer animate-pulse duration-1000 bg-slate-100 relative overflow-hidden rounded-xl w-36 h-36 xl:w-36 xl:h-36 flex items-center justify-center">
                    <svg
                      className="w-9 h-9"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.67578 21.1607L11.6914 25.7778C13.0742 26.5747 14.4219 26.5864 15.8281 25.7778L23.8438 21.1607C24.9336 20.5278 25.5195 19.9067 25.5195 18.2075V9.09036C25.5195 7.43802 24.9219 6.84036 23.9258 6.26614L15.8867 1.62552C14.4336 0.781769 13.0508 0.805207 11.6328 1.62552L3.60547 6.26614C2.59766 6.84036 2 7.43802 2 9.09036V18.2075C2 19.9067 2.59766 20.5278 3.67578 21.1607ZM4.73047 19.4849C4.09766 19.1216 3.88672 18.8052 3.88672 18.1607V9.13724C3.88672 8.5513 4.08594 8.25833 4.64844 7.94192L12.418 3.41849C13.3555 2.89114 14.1406 2.8677 15.1016 3.41849L22.8711 7.94192C23.4336 8.25833 23.6328 8.5513 23.6328 9.13724V18.1607C23.6328 18.8052 23.4336 19.1216 22.7891 19.4849L15.043 23.9732C14.1172 24.5005 13.3789 24.4888 12.4766 23.9732L4.73047 19.4849Z"
                        fill="#acb5c280"
                      />
                    </svg>
                  </div>
                  <div className="svgContainer animate-pulse duration-1000 bg-slate-100 relative overflow-hidden rounded-xl w-36 h-5 xl:w-36 xl:h-5 mt-1 flex items-center justify-center"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr />
      <footer className="mt-10 mb-20 mx-5 md:mx-40 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 w-full">
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
        <div className="text-xs w-full text-center flex gap-1 flex-wrap justify-end">
          <span className="ml-1">Only Symbols Under</span>{" "}
          <a
            className="underline underline-offset-2 hover:no-underline text-blue-500 flex items-end gap-0.5"
            target="_blank"
            rel="noopener noreferrer"
            href="https://creativecommons.org/licenses/by/4.0/"
          >
            CC BY 4.0 License{" "}
            <svg
              className="w-3 h-3"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.3086 17.9609L22.2969 6.17188C22.2969 5.50391 21.8633 5.03516 21.1602 5.03516H9.37109C8.71484 5.03516 8.26953 5.53906 8.26953 6.10156C8.26953 6.66406 8.77344 7.14453 9.32422 7.14453H13.4023L19.1211 6.95703L16.9414 8.86719L5.32812 20.5039C5.11719 20.7148 5 20.9844 5 21.2422C5 21.8047 5.50391 22.332 6.08984 22.332C6.35938 22.332 6.61719 22.2383 6.82812 22.0156L18.4648 10.3906L20.3984 8.19922L20.1875 13.6719V18.0078C20.1875 18.5586 20.668 19.0742 21.2422 19.0742C21.8047 19.0742 22.3086 18.5938 22.3086 17.9609Z"
                fill="currentColor"
              />
            </svg>
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
