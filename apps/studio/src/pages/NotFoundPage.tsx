import { FunctionComponent } from "react";
import { PageNotFound } from "@newm-web/components";
import { useNavigate } from "react-router-dom";

interface NotFoundPageProps {
  redirectUrl?: string;
}

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({
  redirectUrl = "/",
}) => {
  const navigate = useNavigate();
  return (
    <PageNotFound
      layout="sidebar"
      redirectUrl={ redirectUrl }
      onNavigate={ (url) => navigate(url) }
    />
  );
};

export default NotFoundPage;
