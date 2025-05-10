import { useState } from "react";
import { useGetFinalResultDataQuery } from "../app/services/services";
import Details from "./Details";
import Header from "./Header";
import Footer from "./Footer";

type Result = {
  matched: number;
  totalTyped: number;
};

type ScoreCard = {
  id: number;
  userId: number;
  createdAt: string;
  finalResult: Result[];
};

type dataType = {
  message: string;
  allScoreCards: ScoreCard[];
};

function Result() {
  const { data, isLoading, isError } = useGetFinalResultDataQuery();
  const [finalResult, setFinalResult] = useState<
    {
      matched: number;
      totalTyped: number;
    }[]
  >();
  const [createdAt, setCreatedAt] = useState("");

  if (isError) {
    return <>Error.</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log(data);

  return (
    <>
      <Header />
      <div className="bg-black min-h-screen text-neutral-400 pt-20">
        {finalResult && finalResult.length > 0 && (
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
                <Details finalResult={finalResult} createdAt={createdAt} />
              )}
            </div>
          </div>
        )}
        <div className="relative overflow-x-auto max-w-[1200px] m-auto pt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-black bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date / Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Accuracy (%)
                </th>
                <th scope="col" className="px-6 py-3">
                  Characters Per Minute (CPM)
                </th>
                <th scope="col" className="px-6 py-3">
                  Words Per Minute (WPM)
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {(data as dataType).allScoreCards.map(
                (score, scoreIndex: number) => {
                  return (
                    <tr
                      className="bg-white border-b border-neutral-200"
                      key={scoreIndex}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        {new Date(score.createdAt).toLocaleString()}
                      </th>
                      <td className="px-6 py-4 text-neutral-700 font-semibold">
                        {score.finalResult &&
                          Math.ceil(
                            (score.finalResult[score.finalResult.length - 1]
                              .matched /
                              score.finalResult[score.finalResult.length - 1]
                                .totalTyped) *
                              100
                          )}
                      </td>
                      <td className="px-6 py-4 text-neutral-700 font-semibold">
                        {score.finalResult &&
                          Math.ceil(
                            score.finalResult[score.finalResult.length - 1]
                              .totalTyped / 100
                          )}
                      </td>
                      <td className="px-6 py-4 text-neutral-700 font-semibold">
                        {score.finalResult &&
                          Math.ceil(
                            score.finalResult[score.finalResult.length - 1]
                              .matched / 5
                          )}
                      </td>
                      <td className="px-6 py-4 text-neutral-700 font-semibold">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setFinalResult(score.finalResult);
                            setCreatedAt(score.createdAt);
                          }}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Result;
