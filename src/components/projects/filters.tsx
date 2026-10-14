"use client"

import { FunnelPlus } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react"
import FiltersSelect from "./filters-select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useTranslations } from "next-intl"

function ClearAll(
  { showedDropdownElements, setShowedDropdownElements, dropdownElements }:
    { showedDropdownElements: string[]; setShowedDropdownElements: Dispatch<SetStateAction<string[]>>; dropdownElements: { name: string; translate: string; selections: { id: string; translation: string; icon: React.JSX.Element; }[]; value: string[]; setter: Dispatch<SetStateAction<string[]>>; }[] }) {
  const [clearAllOpen, setClearAllOpen] = useState(false);
  const translations = useTranslations("Projects.filters");

  const handleResetAll = () => {
    for (const element of dropdownElements) {
      element.setter([]);
    }
    setClearAllOpen(false);
    setShowedDropdownElements([]);
  }

  return (
    <Popover open={clearAllOpen} onOpenChange={setClearAllOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setClearAllOpen(true)}
          variant="outline"
          disabled={showedDropdownElements.length === 0}
        >{translations("clearall")}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-50" align="end">
        <div className="flex flex-col items-center justify-center gap-2">
          <span>{translations("confirmclear")}</span>
          <div className="flex flex-row justify-between items-center w-full">
            <Button onClick={() => setClearAllOpen(false)}>{translations("cancelclearbutton")}</Button>
            <Button variant="destructive" onClick={() => handleResetAll()}>{translations("confirmclearbutton")}</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function Filters({ dropdownElements }: { dropdownElements: { name: string; translate: string; selections: { id: string; translation: string; icon: React.JSX.Element; }[]; value: string[]; setter: Dispatch<SetStateAction<string[]>>; }[] }) {
  const [search, setSearch] = useState("");
  const [showedDropdownElements, setShowedDropdownElements] = useState<string[]>([]);
  const translations = useTranslations("Projects.filters");

  const handleDelete = (element: { name: string; translate: string; selections: { id: string; translation: string; icon: JSX.Element; }[]; value: string[]; setter: Dispatch<SetStateAction<string[]>>; }) => {
    setShowedDropdownElements([...showedDropdownElements.filter((elem) => elem != element.name)])
    element.setter([]);
  }

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  useEffect(() => {
    const loadParams = () => {
      const params = dropdownElements.map((el) => ({...el, params: searchParams.get(el.name)?.split(",") || []}))
      const showedElementsObject = params.filter((p) => p.params.length > 0).map((p) => p.name)
      setShowedDropdownElements(showedElementsObject)
      for (const p of params){
        p.setter(p.params)
      }
    }
    loadParams();
  }, [])

  useEffect(() => {
    const pushInURL = () => {
      const searchParams = new URLSearchParams("");
      for (const selection of dropdownElements) {
        if (selection.value.length > 0) {
          searchParams.append(selection.name, selection.value.join(","))
        }
      }
      if (searchParams.toString() != "") {
        router.push(`?${searchParams.toString()}`)
      }
      else {
        router.replace(pathname)
      }
    }

    pushInURL()
  }, [
    router,
    ...dropdownElements.map((el) => el.value)
    // selectedFrameworks,
    // selectedLanguages,
    // selectedRuntimes
  ])

  // const [clearAllOpen, setClearAllOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between w-full mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-80 sm:w-full">
        <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-2 mx-auto sm:mx-0">
          <DropdownMenu onOpenChange={() => setSearch("")}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="focus-visible:ring-0">
                <FunnelPlus/>
                {translations("label")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <div
                className="flex items-center px-2 pb-2 pt-1"
                onKeyDown={(e) => {
                  e.stopPropagation()
                }}
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
                <DropdownMenuLabel>{translations("attributes")}</DropdownMenuLabel>
                {
                  dropdownElements.filter((elem) => elem.translate.toLowerCase().includes(search.toLowerCase())).length > 0 ?
                    dropdownElements.filter((elem) => elem.translate.toLowerCase().includes(search.toLowerCase()) && !showedDropdownElements.includes(elem.name)).length > 0 ?
                      dropdownElements.filter((elem) => elem.translate.toLowerCase().includes(search.toLowerCase()) && !showedDropdownElements.includes(elem.name)).map((elem, index) => (
                        <DropdownMenuItem key={index} onClick={() => setShowedDropdownElements([...showedDropdownElements, elem.name])}>
                          {elem.translate}
                        </DropdownMenuItem>
                      ))
                      : <DropdownMenuLabel>{translations("allassigned")}</DropdownMenuLabel>
                    : <DropdownMenuLabel>{translations("noresult")}</DropdownMenuLabel>
                }
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="sm:hidden">
            <ClearAll
              dropdownElements={dropdownElements}
              setShowedDropdownElements={setShowedDropdownElements}
              showedDropdownElements={showedDropdownElements}
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center sm:justify-start mx-auto sm:mx-0 gap-2">
          {
            showedDropdownElements.map((elem) => (
              <FiltersSelect
                key={dropdownElements.filter((e) => e.name === elem)[0].name}
                placeholder={dropdownElements.filter((e) => e.name === elem)[0].translate}
                selections={dropdownElements.filter((e) => e.name === elem)[0].selections}
                selectedSelections={dropdownElements.filter((e) => e.name === elem)[0].value}
                setSelectedSelections={dropdownElements.filter((e) => e.name === elem)[0].setter}
                handleDelete={() => handleDelete(dropdownElements.filter((e) => e.name === elem)[0])}
              />
            ))
          }
        </div>
      </div>
      <div className="items-center hidden sm:flex">
        <ClearAll
          dropdownElements={dropdownElements}
          setShowedDropdownElements={setShowedDropdownElements}
          showedDropdownElements={showedDropdownElements}
        />
      </div>
    </div>
  )
}
