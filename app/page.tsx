"use client";

<<<<<<< HEAD
import HomeView from "../components/Home/Home";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return <HomeView />;
}
=======
import Home from '../components/Home/Home';

export default function Page() {
  return (
    <div className="overflow-hidden">
      <Home />
    </div>
  );
}

>>>>>>> 1714e24a663bcbfe2d737bf380d40a7f428887be
