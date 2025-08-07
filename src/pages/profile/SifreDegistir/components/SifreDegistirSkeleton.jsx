import "./SifreDegistirSkeleton.scss";

const SifreDegistirSkeleton = () => {
  return (
    <div className="sifreDegistirSkeleton">
      <div className="title">
        <div className="titleSkeleton"></div>
      </div>

      <hr />

      <div className="bars">
        <div className="formField">
          <div className="labelSkeleton"></div>
          <div className="inputSkeleton"></div>
        </div>

        <div className="formField">
          <div className="labelSkeleton"></div>
          <div className="inputSkeleton"></div>
        </div>

        <div className="formField">
          <div className="labelSkeleton"></div>
          <div className="inputSkeleton"></div>
        </div>

        <div className="button">
          <div className="buttonSkeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default SifreDegistirSkeleton;
