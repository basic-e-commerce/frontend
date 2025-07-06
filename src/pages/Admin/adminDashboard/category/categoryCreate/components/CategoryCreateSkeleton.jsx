import "./CategoryCreateSkeleton.scss";

const CategoryCreateSkeleton = () => {
  return (
    <div className="categoryCreateSkeleton">
      <div className="skeletonContainer">
        <div className="leftSide">
          <div className="imageUploaderSkeleton">
            <div className="skeletonImage"></div>
          </div>
        </div>
        <div className="rightSection">
          <div className="formGroupSkeleton">
            <div className="skeletonLabel"></div>
            <div className="skeletonInput"></div>
          </div>
          <div className="formGroupSkeleton">
            <div className="skeletonLabel"></div>
            <div className="skeletonInput"></div>
          </div>
          <div className="formGroupSkeleton">
            <div className="skeletonLabel"></div>
            <div className="skeletonTextarea"></div>
          </div>
          <div className="buttonContainerSkeleton">
            <div className="skeletonButton"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreateSkeleton;
