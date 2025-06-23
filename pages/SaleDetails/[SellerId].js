import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import SaleCard from "@/components/SaleCard";

export default function SellerSalePage(props) {
  const [saleData, setSaleData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [status, setStatus] = useState("");
  const router = useRouter();
  const { SellerId } = router.query;

  useEffect(() => {
    if (!SellerId) return;

    const getSale = async () => {
      const res = await Api("get", `getFlashSale?SellerId=${SellerId}`, router);
      if (res.status && res.data.length > 0) {
        setSaleData(res.data[0] || []);
      }
    };

    getSale();
  }, [SellerId]);

  useEffect(() => {
    if (!saleData) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const start = new Date(saleData.startDateTime).getTime();
      const end = new Date(saleData.endDateTime).getTime();

      if (now < start) {
        setStatus("Sale will start soon");
        setTimeLeft(null);
      } else if (now >= start && now < end) {
        const distance = end - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
        setStatus("Sale is live");
      } else {
        setStatus("Sale has ended");
        setTimeLeft(null);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [saleData]);

  const Saleprice = saleData.price
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4 text-[#35035C]">
        Seller Flash Sale
      </h1>
      <p className="text-lg text-gray-700 mb-2">{status}</p>
      {timeLeft && (
        <p className="text-[#7c3aed] mb-6">
          Ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </p>
      )}
      <div className="grid md:grid-cols-5 grid-cols-1 w-full gap-5 md:pt-10 pt-5 px-1 2xl:px-0">
        {saleData?.products?.map((item, i) => (
          <SaleCard
            key={i} // Added key prop for list rendering
            item={item}
            i={i}
            url={`/SaleDetails/${item?.SellerId}`}
            loader={props?.loader}
            Saleprice={Saleprice}
            toaster={props?.toaster}
          />
        ))}
      </div>
    </div>
  );
}
