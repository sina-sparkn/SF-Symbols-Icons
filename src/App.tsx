import svgCode from "./svg-list.json";

function App() {
  function renderSvgCode(svgCode: string | undefined) {
    return <div dangerouslySetInnerHTML={{ __html: svgCode as string }} />;
  }

  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-5 md:mx-40 my-10">
      <h1 className="text-3xl mb-10 font-bold">SF-Symbols</h1>
      <section className="grid grid-cols-3 w-full md:grid-cols-4 lg:grid-cols-6 xl:lg:grid-cols-7 justify-items-center content-center place-items-center place-content-center gap-y-5">
        {svgCode.map((file, index) => (
          <div
            key={index}
            onClick={() => {
              copyTextToClipboard(file.svgCode);
            }}
            className="border rounded-xl cursor-pointer w-24 h-24 md:h-24 md:w-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center"
          >
            <div className="w-fit">{renderSvgCode(file.svgCode)}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
