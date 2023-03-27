import useAppSelector from "@hooks/useAppSelector";

const useHomeProgressBar = () => {

  const loading = useAppSelector(state => state.fileUpload.loading);
  const progress = useAppSelector(state => state.fileUpload.progress);

  return {
    loading,
    progress
  }
}
export default useHomeProgressBar;