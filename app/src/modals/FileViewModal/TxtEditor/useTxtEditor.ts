import * as React from "react";


const useTxtEditor = () => {
  const [text, setText] = React.useState<string>("");

  const handleSetText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  return {
    text,
    setText: handleSetText
  }
}
export default useTxtEditor;
