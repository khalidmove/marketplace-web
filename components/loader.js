import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Circles,
  RotatingSquare,
  RotatingTriangles,
} from "react-loader-spinner";

const Loader = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <Circles
        height="80"
        width="80"
        color="#35035C"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperclassName=""
        visible={true}
      />
    </Backdrop>
  );
};

export default Loader;
