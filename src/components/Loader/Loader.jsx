import { Bars } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <Bars
        height="80"
        width="80"
        color="#7fffd4"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass={s.loader}
        visible={true}
      />
    </div>
  );
};

export default Loader;
