"use client"

import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "../ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

const maxSelectionIcons = 4;

export const MultiSelect = ({ selections, placeholder, selectedSelections, setSelectedSelections }: { selections: { id: string; translation: string; icon: React.JSX.Element }[]; placeholder: string; selectedSelections: string[]; setSelectedSelections: Dispatch<SetStateAction<string[]>> }) => {
  const [search, setSearch] = useState("");
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-0 focus-visible:ring-0 text-muted-foreground hover:text-muted-foreground! w-30">
          {
            selectedSelections.length > 0 ?
              <HoverCard openDelay={10} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <AvatarGroup className="flex-1 w-full px-2 justify-center">
                    {
                      selectedSelections.length <= maxSelectionIcons ?
                        selectedSelections.map((selection) => (
                          <Avatar key={selection} size="sm">
                            <AvatarFallback>
                              {
                                selections.filter((select) => select.id.toLowerCase() === selection.toLowerCase())[0].icon
                              }
                            </AvatarFallback>
                          </Avatar>
                        ))
                        :
                        <>
                          {
                            selectedSelections.slice(0, maxSelectionIcons).map((selection) => (
                              <Avatar key={selection} size="sm">
                                <AvatarFallback>
                                  {
                                    selections.filter((select) => select.id.toLowerCase() === selection.toLowerCase())[0].icon
                                  }
                                </AvatarFallback>
                              </Avatar>
                            ))
                          }
                          <AvatarGroupCount>+{selectedSelections.length - maxSelectionIcons}</AvatarGroupCount>
                        </>
                    }
                  </AvatarGroup>
                </HoverCardTrigger>
                <HoverCardContent className="flex w-33 flex-col gap-0.5 z-10" align="start">
                  <div className="font-semibold">{placeholder.charAt(0).toUpperCase() + placeholder.slice(1) || "Selection"}</div>
                  <ul className="mt-1 ml-4 text-xs text-muted-foreground list-disc">
                    {
                      selectedSelections.map((selection) => (
                        <li key={selection}>
                          {selections.filter((select) => select.id.toLowerCase() === selection.toLowerCase())[0].translation}
                        </li>
                      ))
                    }
                  </ul>
                </HoverCardContent>
              </HoverCard>
            :
            placeholder || "selections..."
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-10" align="start">
        <div
          className="flex items-center px-2 pb-2 pt-1"
          onKeyDown={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            placeholder="Search attributes"
            type="text"
            className="overflow-hidden border-0 bg-transparent focus-visible:ring-0"
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Attributes</DropdownMenuLabel>
          {
            selections.filter((selection) => selection.translation.toLowerCase().includes(search.toLowerCase())).map((selection) => (
              <DropdownMenuItem
                key={selection.id}
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedSelections(prev =>
                    prev.includes(selection.id) ?
                      [...prev.filter((elem) => elem != selection.id)]
                      :
                      [...prev, selection.id]
                  )
                }}
                className="flex flex-row justify-between">
                <span className="flex flex-row gap-1 items-center">
                  <div className="size-3.75">
                    {selection.icon}
                  </div>
                  {selection.translation}
                </span>
                {
                  selectedSelections.includes(selection.id) && (
                    <Check/>
                  )
                }
              </DropdownMenuItem>
            ))
          }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
