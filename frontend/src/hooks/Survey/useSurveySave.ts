import axios from "axios";
import { useAppSelector } from "../../redux/store";
import { useMutation } from "@tanstack/react-query";

export const useSurveySave = () => {
  const survey = useAppSelector((state) => state.survey);
  const postSurveySave = () => axios.post("/user/create/survey", survey.result[survey.result.length - 1]);
  const { mutate: mutateSurveySave } = useMutation({
    mutationKey: ["surveySave"],
    mutationFn: postSurveySave,
  });

  return { mutateSurveySave };
};
