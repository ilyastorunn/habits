import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { useEffect } from "react";

export default function Home() {
  const [cards, setCards] = useState([{ id: 1, title: "daily" }]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [checkedBoxes, setCheckedBoxes] = useState({});

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards"));
    if (savedCards) setCards(savedCards);

    const savedCheckedBoxes = JSON.parse(localStorage.getItem("checkedBoxes"));
    if (savedCheckedBoxes) setCheckedBoxes(savedCheckedBoxes);
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedBoxes", JSON.stringify(checkedBoxes));
  }, [checkedBoxes]);

  const openDialog = () => {
    setIsDialogOpen(true);
    setNewCardTitle("");
  };

  const toggleCheckbox = (cardId, dayIndex) => {
    setCheckedBoxes((prevCheckedBoxes) => {
      const updatedCheckedBoxes = { ...prevCheckedBoxes };
      if (!updatedCheckedBoxes[cardId]) {
        updatedCheckedBoxes[cardId] = {};
      }
      updatedCheckedBoxes[cardId] = {
        ...updatedCheckedBoxes[cardId],
        [dayIndex]: !updatedCheckedBoxes[cardId][dayIndex],
      };
  
      // LocalStorage'a kaydet
      localStorage.setItem("checkedBoxes", JSON.stringify(updatedCheckedBoxes));
  
      return updatedCheckedBoxes;
    });
  };

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentTime(now.toLocaleString("en-US", options));
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const addCard = () => {
    if (newCardTitle.trim() === "") return;
    setCards((prevCards) => [
      ...prevCards,
      { id: Date.now(), title: newCardTitle },
    ]);
    setIsDialogOpen(false);
  };

  const removeCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <TooltipProvider>
      <div className="bg-neutral-950 pt-[40px] h-screen flex flex-col items-center">
        <div className="text-center pb-[40px]">
          <span className="text-5xl text-neutral-300 font-semibold font-['Inter'] italic">
            daily
          </span>
          <span className="text-2xl text-neutral-400 font-semibold font-['Inter'] italic block">
            track and record your habits on one page
          </span>
        </div>

        <div
          className={`grid gap-[15px] mt-5 ${
            cards.length === 1
              ? "grid-cols-1 place-items-center"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              className="w-[345px] h-[278px] bg-neutral-900 rounded-[10px] border-none p-5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <CardTitle className="text-neutral-200 text-3xl font-normal font-['Inter']">
                  {card.title}
                </CardTitle>
                <Button
                  onClick={() => removeCard(card.id)}
                  className="text-neutral-400 hover:text-red-500 transition"
                >
                  <GoTrash className="w-5 h-5" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-[15px] mb-1">
                {Array.from({ length: 28 }).map((_, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Checkbox
                        checked={checkedBoxes[card.id]?.[index] || false}
                        onCheckedChange={() => toggleCheckbox(card.id, index)}
                        className="w-[30px] h-[30px] bg-neutral-700 rounded"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-neutral-800 text-neutral-200 text-xs px-2 py-1">
                      February {index + 1}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Button className="w-[345px] h-[60px] mt-[15px]" onClick={openDialog}>
          <FaPlus className="w-6 h-6 text-neutral-200" />
          <span className="text-neutral-200">add more</span>
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-neutral-900 text-neutral-300 border-none">
            <DialogHeader>
              <DialogTitle>new card</DialogTitle>
            </DialogHeader>
            <Input
              className="text-neutral-200 border-neutral-800"
              placeholder="card title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            />
            <DialogFooter>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="bg-neutral-950 text-neutral-200 hover:bg-neutral-900"
              >
                cancel
              </Button>
              <Button
                onClick={addCard}
                className="text-neutral-950 bg-neutral-200 hover:bg-neutral-300"
              >
                create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="absolute bottom-5 left-5 text-neutral-400 text-xs font-['Inter']">
          {currentTime}
        </div>
      </div>
    </TooltipProvider>
  );
}
