import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
    setSearchQuery("");
    async function getData() {
      await axios
        .get(`/jsons/${category}.json`)
        .then((res) => {
          setData(res.data);
          setSearchedData(res.data);
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

  return (
    <div className="antialiased font-medium">
      <h1 className="text-3xl mb-10 font-bold mx-5 md:mx-40 my-10">
        SF-Symbols
      </h1>

      <section className="flex flex-col px-5 mb-5 gap-3">
        <h2 className="uppercase text-xs text-zinc-500">Categories</h2>
        <div className="flex gap-3">
          <label className="flex gap-1.5">
            <input
              type="radio"
              value="communication"
              checked={category === "communication"}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            Communication
          </label>
          <label className="flex gap-1.5">
            <input
              type="radio"
              value="weather"
              checked={category === "weather"}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            Weather
          </label>
        </div>
      </section>
      <section className="w-full p-5 sticky top-0 flex items-center text-zinc-600 mb-3 shadow bg-white md:px-40 lg:px-40">
        <div className="min-w-5 min-h-5">
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

        <div className="flex gap-3 origin-right">
          <label className="flex gap-2">
            <input
              type="radio"
              value="All"
              checked={selectedOption === "All"}
              onChange={() => {
                setSelectedOption("All");

                setSearchedData(data);
              }}
            />
            All
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              value="Outline"
              checked={selectedOption === "Outline"}
              onChange={() => {
                setSelectedOption("Outline");

                const filteredData = data?.filter(
                  (item) => !item.svgName[0].includes("fill")
                );

                setSearchedData(filteredData);
              }}
            />
            Outline
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              value="Filled"
              checked={selectedOption === "Filled"}
              onChange={() => {
                setSelectedOption("Filled");

                const filteredData = data?.filter((item) =>
                  item.svgName[0].includes("fill")
                );

                setSearchedData(filteredData);
              }}
            />
            Filled
          </label>
        </div>
      </section>
      <section className="mx-5 md:mx-40 my-10">
        <section className="grid grid-cols-3 w-full md:grid-cols-4 lg:grid-cols-6 xl:lg:grid-cols-7 justify-items-center content-center place-items-center place-content-center gap-y-7 ">
          {searchedData?.length === 0 && (
            <div className="w-full text-zinc-500 m-auto flex items-center justify-center mt-40 absolute">
              No SF-Symbols for "{searchQuery}"
            </div>
          )}

          {searchedData?.map((file, index) => (
            <div
              className="svgContainer flex flex-col gap-1 lg:gap-2 w-24 md:w-24 lg:w-32 h-auto xl:w-36"
              key={index}
            >
              <div
                onClick={() => {
                  copyTextToClipboard(file.svgCode);
                }}
                className="border hover:border-black/40 duration-200 rounded-xl cursor-pointer w-24 h-24 md:h-24 md:w-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center"
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
