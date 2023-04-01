import { useDispatch } from "react-redux";
import store, { AppDispatch } from "@redux/store";

const useAppDispatch = () => store.dispatch;
export default useAppDispatch;
