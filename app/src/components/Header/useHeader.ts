import * as React from "react";
import { logout } from "@redux/slices/auth";
import useAppDispatch from "@hooks/useAppDispatch";
import { DropDownListElement } from "@components/DropDownList";

const useHeader = () => {
  const dispatch = useAppDispatch();

  const [isActiveDropDownList, setIsActiveDropDownList] = React.useState<boolean>(false);

  const handleClickDropDownList = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsActiveDropDownList(prev => !prev);
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  const dropDownMenuItems = React.useMemo<DropDownListElement[]>(() => {
    return [
      {
        label: "Выйти",
        iconSrc: "/images/OpenedDoor.png",
        onClick: handleLogout
      }
    ];
  }, []);

  return {
    isActiveDropDownList,
    handleClickDropDownList,
    dropDownMenuItems
  }
}
export default useHeader;
