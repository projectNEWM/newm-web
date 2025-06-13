"use client";

import { FunctionComponent } from "react";
import { PageNotFound } from "@newm-web/components";
import { useRouter } from "next/navigation";

const NotFound: FunctionComponent = () => {
  const router = useRouter();
  return (
    <PageNotFound redirectUrl="/" onNavigate={ (url) => router.push(url) } />
  );
};

export default NotFound;
