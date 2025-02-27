import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardTitle } from "@/components/ui/card";

export default function Alt() {
  return (
    <>
      <div className="bg-neutral-950 pt-[40px] h-screen">
        <Card className="w-[345px] h-[278px] relative bg-neutral-900 rounded-[10px] border-none">
          <CardTitle className="w-[65px] h-[30px] left-[22px] top-[20px] absolute text-neutral-200 text-2xl font-normal font-['Inter'] leading-[30px]">
            daily
          </CardTitle>
          <span className="w-[39px] h-[19px] left-[22px] top-[62px] absolute text-center text-neutral-400 text-[8px] font-normal font-['Inter'] underline leading-tight">
            february
          </span>
          <Checkbox className="w-[30px] h-[30px] left-[25px] top-[89px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[70px] top-[134px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[25px] top-[224px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[115px] top-[89px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[160px] top-[134px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[250px] top-[224px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[25px] top-[134px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[250px] top-[134px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[25px] top-[179px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[70px] top-[224px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[250px] top-[89px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[115px] top-[224px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[115px] top-[179px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[250px] top-[179px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[70px] top-[89px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[115px] top-[134px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[205px] top-[224px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[160px] top-[89px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[205px] top-[134px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[295px] top-[224px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[205px] top-[89px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[295px] top-[134px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[70px] top-[179px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[205px] top-[179px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[295px] top-[89px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[160px] top-[224px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[160px] top-[179px] absolute bg-neutral-700 rounded" />
          <Checkbox className="w-[30px] h-[30px] left-[295px] top-[179px] absolute bg-neutral-700 rounded" />
        </Card>
      </div>
    </>
  );
}
