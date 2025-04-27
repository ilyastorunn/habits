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
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { startOfMonth, getDaysInMonth, getDay, format, subMonths, addMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("cards");
    const initialCards = savedCards ? JSON.parse(savedCards) : [{ id: 1, title: "daily" }];
    
    // Her karta başlangıç tarih bilgilerini ekleyelim
    return initialCards.map(card => ({
      ...card,
      currentDate: new Date(),
      daysInMonth: getDaysInMonth(new Date()),
      startDayOffset: (() => {
        const monthStart = startOfMonth(new Date());
        const rawStartDay = getDay(monthStart);
        const weekStartsOn = 1;
        return (rawStartDay - weekStartsOn + 7) % 7;
      })()
    }));
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [checkedBoxes, setCheckedBoxes] = useState({});
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

  const updateCalendarData = (date, cardId) => {
    const monthStart = startOfMonth(date);
    const days = getDaysInMonth(date);
    const rawStartDay = getDay(monthStart);
    const weekStartsOn = 1;
    const offset = (rawStartDay - weekStartsOn + 7) % 7;

    setCards(prevCards => prevCards.map(card => {
      if (card.id === cardId) {
        return {
          ...card,
          daysInMonth: days,
          startDayOffset: offset
        };
      }
      return card;
    }));
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

  const openDialog = () => {
    setIsDialogOpen(true);
    setNewCardTitle("");
  };

  const toggleCheckbox = (cardId, dayIndex) => {
    const monthKey = format(cards.find(card => card.id === cardId).currentDate, 'yyyy-MM');
    setCheckedBoxes(prevCheckedBoxes => {
      const updatedCheckedBoxes = JSON.parse(JSON.stringify(prevCheckedBoxes));
      
      if (!updatedCheckedBoxes[cardId]) {
        updatedCheckedBoxes[cardId] = {};
      }
      if (!updatedCheckedBoxes[cardId][monthKey]) {
        updatedCheckedBoxes[cardId][monthKey] = {};
      }
      
      updatedCheckedBoxes[cardId][monthKey][dayIndex] = 
        !updatedCheckedBoxes[cardId][monthKey][dayIndex];
      
      localStorage.setItem("checkedBoxes", JSON.stringify(updatedCheckedBoxes));
      return updatedCheckedBoxes;
    });
  };

  const addCard = () => {
    if (newCardTitle.trim() === "") return;

    setCards((prevCards) => {
      const now = new Date();
      const monthStart = startOfMonth(now);
      const rawStartDay = getDay(monthStart);
      const weekStartsOn = 1;
      
      const newCard = {
        id: Date.now(),
        title: newCardTitle,
        currentDate: now,
        daysInMonth: getDaysInMonth(now),
        startDayOffset: (rawStartDay - weekStartsOn + 7) % 7
      };
      
      const updatedCards = [...prevCards, newCard];
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

  const previousMonth = (cardId) => {
    setCards(prevCards => prevCards.map(card => {
      if (card.id === cardId) {
        const newDate = subMonths(card.currentDate, 1);
        return {
          ...card,
          currentDate: newDate,
          daysInMonth: getDaysInMonth(newDate),
          startDayOffset: (() => {
            const monthStart = startOfMonth(newDate);
            const rawStartDay = getDay(monthStart);
            const weekStartsOn = 1;
            return (rawStartDay - weekStartsOn + 7) % 7;
          })()
        };
      }
      return card;
    }));
  };

  const nextMonth = (cardId) => {
    setCards(prevCards => prevCards.map(card => {
      if (card.id === cardId) {
        const newDate = addMonths(card.currentDate, 1);
        return {
          ...card,
          currentDate: newDate,
          daysInMonth: getDaysInMonth(newDate),
          startDayOffset: (() => {
            const monthStart = startOfMonth(newDate);
            const rawStartDay = getDay(monthStart);
            const weekStartsOn = 1;
            return (rawStartDay - weekStartsOn + 7) % 7;
          })()
        };
      }
      return card;
    }));
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
          {cards.map((card) => {
            const rowCount = Math.ceil((card.startDayOffset + card.daysInMonth) / 7);
            const cardHeight = 130 + rowCount * 45;

            return (
              <Card
                key={card.id}
                style={{ height: `${cardHeight}px` }}
                className="relative w-[345px] bg-neutral-900 rounded-[10px] border-none p-5"
              >
                <div className="flex flex-col h-full space-y-2.5">
                  <div>
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
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <CardTitle
                            className="text-neutral-200 text-3xl font-normal font-['Inter'] pl-2"
                            onClick={() => startEditing(card.id, card.title)}
                          >
                            {card.title}
                          </CardTitle>
                          <Button
                            onClick={() => removeCard(card.id)}
                            className="text-neutral-400 hover:text-red-500 transition"
                          >
                            <GoTrash className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 font-['Inter']">
                          <Button
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-neutral-800 ml-0 pl-0"
                            onClick={() => previousMonth(card.id)}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span>
                            {format(card.currentDate, "MMMM yyyy")}
                          </span>
                          <Button
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-neutral-800"
                            onClick={() => nextMonth(card.id)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="w-[30px] h-[30px] flex items-center justify-center text-xs text-neutral-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2 mt-auto pb-[20px]">
                    {[...Array(card.startDayOffset + card.daysInMonth)].map((_, i) => {
                      const dayIndex = i - card.startDayOffset;
                      const monthKey = format(card.currentDate, 'yyyy-MM');
                      
                      return (
                        <div key={i}>
                          {i < card.startDayOffset ? (
                            <div className="w-[30px] h-[30px]" />
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="relative">
                                  <Checkbox
                                    checked={Boolean(checkedBoxes?.[card.id]?.[monthKey]?.[dayIndex])}
                                    onCheckedChange={() => toggleCheckbox(card.id, dayIndex)}
                                    className="w-[30px] h-[30px] bg-neutral-700 rounded"
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-neutral-800 text-neutral-200 text-xs px-2 py-1 flex flex-col items-center">
                                <span>{format(new Date(card.currentDate.getFullYear(), card.currentDate.getMonth(), dayIndex + 1), "MMMM d")}</span>
                                <span>{format(new Date(card.currentDate.getFullYear(), card.currentDate.getMonth(), dayIndex + 1), "EEEE")}</span>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            );
          })}
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

        <div className="w-full px-5 py-8 mt-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-400 text-xs font-['Inter']">
            <div>{currentTime}</div>
            <div>
              created by <a href="https://github.com/ilyastorunn" target="_blank">ilyas torun</a>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}