import * as React from "react";
import { setRootFolder } from "@redux/slices/file";
import FolderModel from "@entities/file/FolderModel";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";

const rootFolder: FolderModel = {
  name: "root",
  path: "root",
  isRoot: true,
  parentPath: null,
  childFiles: [
    {
      name: "1.txt",
      path: "root/1.txt",
      parentPath: "root"
    },
    {
      name: "2.txt",
      path: "root/2.txt",
      parentPath: "root"
    },
    {
      name: "3.txt",
      path: "root/3.txt",
      parentPath: "root"
    },
    {
      name: "4.txt",
      path: "root/4.txt",
      parentPath: "root"
    },
    {
      name: "dddddddddddd.txt",
      path: "root/dddddddddddd.txt",
      parentPath: "root"
    },
    {
      name: "5.txt",
      path: "root/5.txt",
      parentPath: "root"
    }
  ],
  childFolders: [
    {
      name: "a",
      path: "root/a",
      isRoot: false,
      parentPath: "root",
      childFiles: [
        {
          name: "1.txt",
          path: "root/1.txt",
          parentPath: "root"
        },
        {
          name: "2.txt",
          path: "root/2.txt",
          parentPath: "root"
        }
      ],
      childFolders: []
    }
  ]
}

const useFolderHierarchy = () => {
  const dispatch = useAppDispatch();

  const openedFolder = useAppSelector(state => state.file.openedFolder);

  React.useEffect(() => { // test folder data
    dispatch(setRootFolder(rootFolder));
  }, []);

  return {
    openedFolder
  }
}
export default useFolderHierarchy;
