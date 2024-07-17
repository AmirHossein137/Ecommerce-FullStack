import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PropertiesSelect = ({ properties , propertiesValue , setPropertiesValue }) => {
    
  return (
    <>
      {properties.map((item ,index) => (
        <div className="flex flex-col gap-3 w-full max-w-sm mb-3" key={index}>
          <span>{item.name}</span>
          <Select value={[...propertiesValue]} onValueChange={setPropertiesValue}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select Your ${item.name}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {item.value.map((i) => (
                  <SelectItem key={i} value={i}>{i}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
    </>
  );
};

export default PropertiesSelect;
