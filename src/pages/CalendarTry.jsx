import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

export default function CalendarTry() {
  const [selectedDates, setSelectedDates] = React.useState([]);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const handleCheckboxChange = (checked, date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setSelectedDates(prev => {
      if (checked) {
        return [...prev, dateStr];
      } else {
        return prev.filter(d => d !== dateStr);
      }
    });
  };

  return (
    <div>
      <Calendar
        mode="single"
        selected={null}
        onSelect={() => {}}
        className="rounded-md border shadow bg-background"
        onMonthChange={setCurrentMonth}
        components={{
          Day: ({ date: dayDate, ...props }) => {
            if (!dayDate || dayDate.getMonth() !== currentMonth.getMonth()) {
              return <div className="h-9 w-9" />;
            }

            const dateStr = format(dayDate, 'yyyy-MM-dd');
            const isChecked = selectedDates.includes(dateStr);
            
            return (
              <div
                {...props}
                className="h-9 w-9 p-0 flex items-center justify-center"
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => handleCheckboxChange(checked, dayDate)}
                  className="h-5 w-5"
                />
              </div>
            );
          },
        }}
      />
    </div>
  );
}
