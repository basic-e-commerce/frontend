import "./SettingsSkeleton.scss";

const SettingsSkeleton = () => {
  return (
    <div className="ayarlar">
      <div className="">
        <div className="ayarlarContent">
          <div className="settingsForm">
            <div className="leftSide">
              <div className="storeInfoSkeleton">
                <div className="skeletonTitle"></div>
                <div className="skeletonText"></div>
                <div className="skeletonText"></div>
              </div>
            </div>

            <div className="rightSection">
              <div className="workingHoursSkeleton">
                <div className="skeletonTitle"></div>
                <div className="skeletonDays">
                  {[...Array(7)].map((_, index) => (
                    <div key={index} className="skeletonDay">
                      <div className="skeletonDayName"></div>
                      <div className="skeletonTimeInputs">
                        <div className="skeletonTimeInput"></div>
                        <div className="skeletonTimeInput"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="formFieldsSkeleton">
                {[...Array(15)].map((_, index) => (
                  <div key={index} className="skeletonField">
                    <div className="skeletonLabel"></div>
                    <div className="skeletonInput"></div>
                  </div>
                ))}
              </div>

              <div className="submitButtonSkeleton">
                <div className="skeletonButton"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeleton;
