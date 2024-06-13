import axios from "axios";
import { useAppSelector } from "../redux/store";
import { useMutation } from "@tanstack/react-query";

export const useCatSave = () => {
  const cat = useAppSelector((state) => state.cat);
  const postCatSave = async () => await axios.patch("/user/update/cat", { ...cat });
  const { mutate: mutateCatSave } = useMutation({
    mutationKey: ["catSave"],
    mutationFn: postCatSave,
  });
  return { mutateCatSave };
};
