import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";


interface IProps {
  completed: number;
}
const DocumentProgressBar = ({completed}: IProps) => {
  return <ProgressBar  padding="0" width="64px" height="64px" borderRadius="50%" bgColor="" maxCompleted={100}  completedClassName="justify-center items-center w-full h-full flex bg-black" labelColor="white" labelClassName="" completed={completed}/>
};
export default DocumentProgressBar