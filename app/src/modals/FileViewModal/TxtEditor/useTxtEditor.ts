import * as React from "react";
import useAppSelector from "@hooks/useAppSelector";

const useTxtEditor = () => {
  const [text, setText] = React.useState<string>("");

  const fileLoaded = useAppSelector(state => state.openedFile.loaded);
  const fileContent = useAppSelector(state => state.openedFile.content);

  const handleSetText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  const handleSaveText = () => {
    
  }

  React.useEffect(() => {
    if (!fileLoaded) return;
    const decoder = new TextDecoder("utf-8");
    const result = decoder.decode(new Uint8Array(fileContent));
    setText(result);
  }, [fileLoaded, fileContent]);

  return {
    text,
    setText: handleSetText
  }
}
export default useTxtEditor;
