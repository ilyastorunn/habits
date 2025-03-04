import { useState, useEffect } from "react";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";

export default function Home() {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : [{ id: 1, title: "daily" }];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const [daysInMonth, setDaysInMonth] = useState(28);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    const savedCheckedBoxes = localStorage.getItem("checkedBoxes");
    if (savedCheckedBoxes) {
      setCheckedBoxes(JSON.parse(savedCheckedBoxes));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(checkedBoxes).length > 0) {
      localStorage.setItem("checkedBoxes", JSON.stringify(checkedBoxes));
    }
  }, [checkedBoxes]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const days = new Date(year, month, 0).getDate();
    setDaysInMonth(days);
  }, []);

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
      localStorage.setItem("checkedBoxes", JSON.stringify(updatedCheckedBoxes));
      return updatedCheckedBoxes;
    });
  };

  const addCard = () => {
    if (newCardTitle.trim() === "") return;

    setCards((prevCards) => {
      const updatedCards = [
        ...prevCards,
        { id: Date.now(), title: newCardTitle },
      ];
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      return updatedCards;
    });

    setIsDialogOpen(false);
  };

  const removeCard = (id) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== id);
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  const rowCount = Math.ceil(daysInMonth / 7);
  const cardHeight = 89 + rowCount * 45;

  const startEditing = (id, title) => {
    setEditingCardId(id);
    setEditedTitle(title);
  };

  const saveTitle = (id) => {
    if (editedTitle.trim() === "") return;

    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === id ? { ...card, title: editedTitle } : card
      );
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      return updatedCards;
    });

    setEditingCardId(null);
  };

  return (
    <TooltipProvider>
      <div className="bg-neutral-950 pt-[40px] min-h-screen flex flex-col items-center relative">
        <div className="text-center pb-[40px]">
          <span className="text-5xl text-neutral-300 font-semibold italic pb-[32px]">
            daily
          </span>
          <span className="text-2xl text-neutral-400 font-semibold italic block">
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
              style={{ height: `${cardHeight}px` }}
              className="w-[345px] h-[278px] bg-neutral-900 rounded-[10px] border-none p-5 flex flex-col gap-6"
            >
              <div className="flex justify-between items-center">
                {editingCardId === card.id ? (
                  <Input
                    autoFocus
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={() => saveTitle(card.id)}
                    onKeyDown={(e) => e.key === "Enter" && saveTitle(card.id)}
                    className="bg-neutral-800 text-neutral-200 text-3xl font-normal p-1 rounded outline-none"
                  />
                ) : (
                  <CardTitle
                    className="text-neutral-200 text-3xl font-normal font-['Inter']"
                    onClick={() => startEditing(card.id, card.title)}
                  >
                    {card.title}
                  </CardTitle>
                )}
                <Button
                  onClick={() => removeCard(card.id)}
                  className="text-neutral-400 hover:text-red-500 transition"
                >
                  <GoTrash className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {[...Array(daysInMonth)].map((_, dayIndex) => (
                  <Checkbox
                    key={dayIndex}
                    checked={checkedBoxes[card.id]?.[dayIndex] || false}
                    onCheckedChange={() => toggleCheckbox(card.id, dayIndex)}
                    className="w-[30px] h-[30px] bg-neutral-700 rounded"
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Button className="w-[345px] h-[60px] my-[16px]" onClick={openDialog}>
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
                className="text-neutral-400 bg-neutral-800 hover:bg-neutral-700"
              >
                Cancel
              </Button>
              <Button
                onClick={addCard}
                className="text-neutral-950 bg-neutral-200 hover:bg-neutral-300"
              >
                Create
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
