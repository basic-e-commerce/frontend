import "./KargoAdresSkeleton.scss";

const KargoAdresSkeleton = () => {
  return (
    <div className="KargoAdresSkeleton">
      {/* Title skeleton */}
      <div className="titleSkeleton">
        <div className="titleBar"></div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Content area */}
      <div className="contentSkeleton">
        {/* Add button skeleton */}
        <div className="addButtonSkeleton">
          <div className="buttonPulse"></div>
          <div className="buttonText"></div>
        </div>

        {/* Address cards skeleton */}
        {[1, 2, 3].map((index) => (
          <div key={index} className="addressCardSkeleton">
            <div className="cardHeader">
              <div className="titlePulse"></div>
              <div className="actionsPulse">
                <div className="actionDot"></div>
                <div className="actionDot"></div>
              </div>
            </div>

            <div className="cardContent">
              <div className="nameRow">
                <div className="namePulse"></div>
                <div className="namePulse"></div>
              </div>

              <div className="addressRow">
                <div className="addressPulse"></div>
              </div>

              <div className="locationRow">
                <div className="locationPulse"></div>
                <div className="locationPulse"></div>
              </div>

              <div className="phoneRow">
                <div className="phonePulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KargoAdresSkeleton;
