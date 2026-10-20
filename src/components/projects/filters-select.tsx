import { BroomSparkles, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { MultiSelect } from "./multi-select";
import { FiltersElementsType } from "@/types/project";

type FilterSelectType = FiltersElementsType & {handleDelete: () => void}

export default function FiltersSelect(
  { selections, selectedSelections, setSelectedSelections, placeholder, handleDelete }
    : FilterSelectType) {

  const handleClear = () => {
    setSelectedSelections([]);
  }

  return (
    <ButtonGroup>
      <ButtonGroup>
        <MultiSelect
          selections={selections}
          placeholder={placeholder}
          selectedSelections={selectedSelections}
          setSelectedSelections={setSelectedSelections}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More Options">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-33">
            <DropdownMenuGroup >
              <DropdownMenuItem variant="destructive" onClick={() => handleClear()} disabled={selectedSelections.length === 0}>
                <BroomSparkles />
                Clear
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => handleDelete()}>
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
