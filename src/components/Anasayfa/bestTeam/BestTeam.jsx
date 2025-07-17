import Baslik from "../../baslik/Baslik";
import ProjelerGlide from "../../ProjerlerGlide/ProjelerGlide";
import "./BestTeam.scss";

const BestTeam = ({ products }) => {
  return (
    <div className="bestTeam">
      <div className="container">
        <div className="content">
          <div className="left">
            <Baslik title="En çok satanlar" desc="İmalattan Sofranıza" />
          </div>

          <div className="TeamlistCards">
            <ProjelerGlide
              key={window.location.pathname}
              perView={3}
              products={products}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestTeam;
