import { useDispatch } from "react-redux";
import ListRouter from "./routing/Router";
import { useEffect } from "react";
import { getCurrentUser } from "./Store/userSlice";
import Blank from "./Components/Screens/Blank";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch])
  return (
    <>
      {/* <Blank itemsPerPage={4} />, */}
      <ListRouter />
    </>
  );
}

export default App;
