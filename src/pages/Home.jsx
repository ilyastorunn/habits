import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardTitle } from "@/components/ui/card";

export default function Home() {
  const checkboxes = Array.from({ length: 28 });

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
      <Card className="w-[345px] h-[278px] bg-neutral-900 rounded-[10px] border-none p-5 flex flex-col justify-between">
        <CardTitle className="text-neutral-200 text-2xl font-normal">
          daily
        </CardTitle>
        <span className="text-neutral-400 text-[8px] font-normal underline">
          february
        </span>
        <div className="grid grid-cols-7 gap-[15px] mb-[24px]">
          {checkboxes.map((_, index) => (
            <Checkbox
              key={index}
              className="w-[30px] h-[30px] bg-neutral-700 rounded"
            />
          ))}
        </div>
      </Card>
    </div>
  );
}