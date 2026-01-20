"use client";

import HomeView from "../components/Home/Home";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return <HomeView />;
}
