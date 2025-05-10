import { useEffect, useState } from "react";
import { useGetAllWordsQuery } from "../app/services/services";
import { useFinalResultDataUpload } from "../utils/uploadData";
import Header from "./Header";
import Footer from "./Footer";
import Details from "./Details";

type dataType = {
  words: string[];
};

function Words() {
  const { data, isError, isLoading, refetch } = useGetAllWordsQuery();
  const { uplaodData } = useFinalResultDataUpload();
  const [count, setCount] = useState(-1);
  const [maxCount, setMaxCount] = useState(20);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [typedWords, setTypedWords] = useState<
    {
      char: string;
      letter: number;
      color: string;
    }[]
  >([]);
  const [result, setResult] = useState<{
    matched: number;
    totalTyped: number;
  }>({ matched: 0, totalTyped: 0 });
  const [finalResult, setFinalResult] = useState<
    { matched: number; totalTyped: number }[]
  >([]);
  const [timer, setTimer] = useState(60);
  const [isTimerOn, setIsTimerOn] = useState(false);

  useEffect(() => {
    if (!isError && !isLoading && data) {
      localStorage.setItem(
        "all_words",
        JSON.stringify((data as dataType).words)
      );

      const words = JSON.parse(localStorage.getItem("all_words")!)
        .slice(maxCount - 20, maxCount)
        .map((word: unknown) => word)
        .join(" ");

      const letters = [...words].map((letter) => ({
        char: letter,
        letter: letter.charCodeAt(0),
        color: "",
      }));

      setTypedWords(letters);
    }
  }, [isError, isLoading, data, maxCount]);

  useEffect(() => {
    setFinalResult((prevState) => [
      ...prevState,
      {
        matched: result.matched / 2,
        totalTyped: result.totalTyped / 2,
      },
    ]);

    const uploadFinalData = async () => {
      await uplaodData(finalResult);
    };

    if (timer === 0) {
      uploadFinalData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  console.log(finalResult);

  const handleTimer = () => {
    const settingTimer = setInterval(() => {
      setTimer((prevState) => {
        if (prevState <= 1) {
          clearInterval(settingTimer);
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (isTimerOn === false) {
        handleTimer();
        setIsTimerOn(true);
      }

      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
      }

      const capsLockChecker =
        e.getModifierState && e.getModifierState("CapsLock");

      setIsCapsLockOn(capsLockChecker);

      if (e.key === "Backspace") {
        setTypedWords((prevState) => {
          const currArr = prevState;
          if (count == -1) return currArr;
          currArr[count].color = "";

          setResult((prevState) => {
            let prevStateObject = prevState;
            if (Object.keys(prevStateObject).length === 0) {
              prevStateObject = { matched: 0, totalTyped: 0 };
            } else {
              prevStateObject = {
                matched: prevStateObject.matched - 1,
                totalTyped: prevStateObject.totalTyped - 1,
              };
            }
            return prevStateObject;
          });

          return currArr;
        });

        setCount((prevState) => {
          const updated = prevState >= 0 ? prevState - 1 : -1;
          return updated;
        });
      } else if (e.key === " ") {
        const typed = 32;
        let getCount: number | null = null;
        setCount((prevState) => {
          const updated = prevState + 1;
          getCount = updated;
          return updated;
        });
        setTypedWords((prevState) => {
          let matched: number = 0;

          const currArr = prevState;
          if (currArr[getCount!].letter === typed) {
            matched++;
            currArr[getCount!].color = "white";
          } else {
            currArr[getCount!].color = "red";
          }

          setResult((prevState) => {
            let prevStateObject = prevState;
            if (Object.keys(prevStateObject).length === 0) {
              prevStateObject = { matched: matched, totalTyped: 1 };
            } else {
              prevStateObject = {
                matched: prevStateObject.matched + matched,
                totalTyped: prevStateObject.totalTyped + 1,
              };
            }
            return prevStateObject;
          });

          return currArr;
        });

        e.preventDefault();
      } else if (e.key.length === 1) {
        const typed = e.key.charCodeAt(0);
        let getCount: number | null = null;
        setCount((prevState) => {
          const updated = prevState + 1;
          getCount = updated;
          return updated;
        });
        setTypedWords((prevState) => {
          let matched: number = 0;

          const currArr = prevState;
          if (currArr[getCount!].letter === typed) {
            matched++;
            currArr[getCount!].color = "white";
          } else {
            currArr[getCount!].color = "red";
          }

          setResult((prevState) => {
            let prevStateObject = prevState;
            if (Object.keys(prevStateObject).length === 0) {
              prevStateObject = { matched: matched, totalTyped: 1 };
            } else {
              prevStateObject = {
                matched: prevStateObject.matched + matched,
                totalTyped: prevStateObject.totalTyped + 1,
              };
            }
            return prevStateObject;
          });

          return currArr;
        });
      }

      if (count + 1 === typedWords.length - 1) {
        setMaxCount((prevState) => prevState + 20);
        setCount(-1);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [count, typedWords, isCapsLockOn, isTimerOn]);

  if (isError) {
    return <>Error</>;
  }

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className="bg-black">
      {finalResult && finalResult.length > 0 && timer === 0 && (
        <div className="absolute min-h-screen w-full left-0 top-0 z-100 bg-black px-10 py-5">
          <div className="flex justify-end">
            <button
              className="bg-white text-black font-semibold px-3 py-0.5 cursor-pointer"
              onClick={() => setFinalResult([])}
            >
              <i className="fas fa-times"></i> Close{" "}
            </button>
          </div>
          <div className="h-[500px]">
            {finalResult?.length && (
              <Details
                finalResult={finalResult}
                createdAt={new Date().toLocaleString()}
              />
            )}
          </div>
        </div>
      )}

      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center leading-relaxed">
        <div className="max-w-[1000px]">
          <div className="w-full absolute left-0 top-20">
            {isCapsLockOn && (
              <div className="flex gap-2 items-center justify-center mb-16 text-white">
                <i className="fa-solid fa-lock"></i>
                <p>Caps Lock</p>
              </div>
            )}
          </div>
          <div className="text-white text-center text-3xl mb-16">
            <span>{timer}</span>
          </div>
          {typedWords.map((letterObject, letterObjectIndex) => (
            <span key={letterObjectIndex} className="text-3xl">
              <span
                className={`
                ${letterObject.color === "white" && "bg-white"} ${
                  letterObject.color === "red" && "bg-red-400"
                } ${letterObject.color === "" && "text-neutral-400"}`}
              >
                {letterObject.char}
              </span>
            </span>
          ))}
        </div>
        <button
          className="text-white cursor-pointer mt-10 text-md"
          onClick={() => {
            refetch();
            setTimer(60);
          }}
        >
          <span>
            <i className="fa-solid fa-rotate-right text-white"></i>
          </span>{" "}
          <span className="text-neutral-400 ml-1">Start over</span>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Words;
