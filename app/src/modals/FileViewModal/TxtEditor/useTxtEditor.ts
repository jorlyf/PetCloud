import * as React from "react";
import { updateTxtFileContent } from "@redux/slices/openedFile";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";

const useTxtEditor = () => {
  const dispatch = useAppDispatch();

  const [serverText, setServerText] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");

  const fileId = useAppSelector(state => state.file.openedFileId);

  const fileLoaded = useAppSelector(state => state.openedFile.loaded);
  const fileContent = useAppSelector(state => state.openedFile.content);

  const handleSetText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  const handleSaveText = React.useCallback(() => {
    if (text === serverText) return; // not changed
    dispatch(updateTxtFileContent({ fileId, content: text }));
    setServerText(text);
  }, [text, serverText]);

  React.useEffect(() => {
    if (!fileLoaded) return;
    const decoder = new TextDecoder("utf-8");
    const result = decoder.decode(new Uint8Array(fileContent));
    setServerText(result);
    setText(result);
  }, [fileLoaded, fileContent]);

  return {
    text,
    setText: handleSetText,
    handleSaveText
  }
}
export default useTxtEditor;
