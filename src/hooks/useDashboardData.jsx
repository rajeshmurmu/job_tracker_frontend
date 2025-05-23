import React, { useCallback, useEffect, useState } from "react";
import { useApplicationStore } from "../store/store";

export default function useDashboardData() {
  const { applications } = useApplicationStore();
  const [interviewCount, setInterviewCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Applications",
        data: [12, 19, 8, 15, 12, 18],
        backgroundColor: "#2c4e85",
      },
    ],
  });

  const getApplicationsPerMonth = useCallback(() => {
    const counts = {};
    applications.forEach(({ applied_date }) => {
      const month = new Date(applied_date).toLocaleString("default", {
        month: "long",
      });

      counts[month] = (counts[month] || 0) + 1;
    });
    const labels = Object.keys(counts);
    const data = Object.values(counts);

    setChartData({
      labels,
      datasets: [
        {
          label: "Applications",
          data,
          backgroundColor: "#2c4e85",
        },
      ],
    });
  }, [applications]);

  useEffect(() => {
    const getInterviewsCount = () => {
      const interviews = applications.filter(
        (application) => application.status === "Interview"
      );
      console.log(interviews);
      setInterviewCount(interviews.length);
    };

    const getOffersCount = () => {
      const offers = applications.filter(
        (application) => application.status === "Offer"
      );
      console.log(offers);
      setOfferCount(offers.length);
    };
    getInterviewsCount();
    getOffersCount();
    getApplicationsPerMonth();
  }, [applications, getApplicationsPerMonth, interviewCount]);
  return { chartData, interviewCount, offerCount };
}
