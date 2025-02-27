import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

export default function Home() {
  const [cards, setCards] = useState([1]);

  const addCard = () => {
    setCards((prevCards) => [...prevCards, prevCards.length + 1]);
  };

  return (
    <div className="bg-neutral-950 pt-[40px] h-screen flex flex-col items-center">
      <div className="text-center pb-[40px]">
        <span className="text-5xl text-neutral-300 font-semibold italic">
          daily
        </span>
        <span className="text-2xl text-neutral-400 font-semibold italic block">
          track and record your habits on one page
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] mt-5">
        {cards.map((id) => (
          <Card key={id} className="w-[345px] h-[278px] bg-neutral-900 rounded-[10px] border-none p-5 flex flex-col justify-between">
            <CardTitle className="text-neutral-200 text-3xl font-normal font-['Inter']">
              daily
            </CardTitle>
            <span className="text-neutral-400 text-xs font-normal font-['Inter'] underline pt-[9px] pb-2">
              february
            </span>
            <div className="grid grid-cols-7 gap-[15px] mb-1">
              {Array.from({ length: 28 }).map((_, index) => (
                <Checkbox
                  key={index}
                  className="w-[30px] h-[30px] bg-neutral-700 rounded"
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Button className="w-[345px] h-[60px] mt-[15px]" onClick={addCard}>
        <FaPlus className="w-6 h-6" />
        <span>add more</span>
      </Button>
    </div>
  );
}
