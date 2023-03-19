import * as React from "react";
import useAppSelector from "@hooks/useAppSelector";

const usePhotoViewer = () => {
  const fileContent = useAppSelector(state => state.openedFile.content);

  const imageSrc = React.useMemo(() => {
    const blob = new Blob( [ fileContent ], { type: "image/jpeg" } );
    return URL.createObjectURL(blob);
  }, [fileContent]);

  return {
    imageSrc
  }
}
export default usePhotoViewer;
