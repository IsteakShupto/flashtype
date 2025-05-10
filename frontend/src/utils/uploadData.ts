import { useFinalResultMutation } from "../app/services/services";

export const useFinalResultDataUpload = () => {
  const [
    finalResult,
    {
      data: finalResultData,
      isError: finalResultError,
      isLoading: finalResultIsLoading,
    },
  ] = useFinalResultMutation();

  const uplaodData = async (finalResultData: unknown) => {
    try {
      const result = await finalResult({
        finalResult: finalResultData,
      }).unwrap();
      console.log(result, finalResultData);
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return {
    finalResultData,
    uplaodData,
    finalResultError,
    finalResultIsLoading,
  };
};
