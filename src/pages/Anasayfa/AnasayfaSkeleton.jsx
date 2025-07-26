import "./AnasayfaSkeleton.scss";

const AnasayfaSkeleton = () => {
  return (
    <div className="anasayfa-skeleton container">
      <div className="topSideAnasayfa-skeleton">
        <div className="container">
          <div className="topSideAnasayfaContent-skeleton">
            <div className="slider-skeleton" />
            <div className="sliderLeft-skeleton" />
          </div>
        </div>
      </div>

      <div className="fadeInSection-skeleton">
        <div className="anaProduct-skeleton" />
      </div>

      <div className="fullImg-skeleton" />

      <div className="fadeInSection-skeleton">
        <div className="populerProduct-skeleton" />
      </div>
      <div className="fadeInSection-skeleton">
        <div className="whoFounder-skeleton" />
      </div>
      <div className="fadeInSection-skeleton">
        <div className="whyOur-skeleton" />
      </div>

      <div className="slider-karePost-skeleton">
        <div className="slider-track-skeleton">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="slide-skeleton" />
          ))}
        </div>
      </div>

      <div className="sikcaSorulan-skeleton" />
    </div>
  );
};

export default AnasayfaSkeleton;
