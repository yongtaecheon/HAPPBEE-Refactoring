import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../redux/store";

export const useSurveySave = () => {
  const survey = useAppSelector((state) => state.survey);
  const postSurveySave = async () => await axios.post("/user/create/survey", survey.result[survey.result.length - 1]);
  const { mutate: mutateSurveySave } = useMutation({
    mutationKey: ["surveySave"],
    mutationFn: postSurveySave,
  });

  return { mutateSurveySave };
};
