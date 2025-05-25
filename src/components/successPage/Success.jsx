import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const html = location.state?.html;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default SuccessPage;
