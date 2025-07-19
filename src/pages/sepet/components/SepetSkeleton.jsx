import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

const SepetSkeleton = () => (
  <div className="sepet">
    <div className="container">
      <div className="wrapper">
        <Paper
          className="form"
          sx={{
            boxShadow: 4,
            padding: "3rem 3.5rem",
            borderRadius: 1,
          }}
        >
          <div>
            <Skeleton variant="text" width={180} height={40} />
            <Skeleton variant="text" width={250} height={24} />
          </div>
          <div className="cuppon">
            <Skeleton
              variant="rectangular"
              width={300}
              height={40}
              style={{ borderRadius: 8 }}
            />
          </div>
          <div style={{ marginTop: 24 }}>
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="100%"
                height={80}
                style={{ borderRadius: 8, marginBottom: 16 }}
              />
            ))}
          </div>
        </Paper>
        <div style={{ minWidth: 320, marginLeft: 32 }}>
          <Skeleton
            variant="rectangular"
            width={320}
            height={200}
            style={{ borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SepetSkeleton;
