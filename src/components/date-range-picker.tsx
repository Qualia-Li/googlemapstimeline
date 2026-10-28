"use client";

import * as React from "react";
import { addDays, format, startOfWeek, endOfWeek, subWeeks, startOfMonth, endOfMonth, subMonths, startOfYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import type { Locale as DateFnsLocale } from "date-fns";
import { EN_UI, type UiStrings } from "@/lib/i18n";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  className?: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

interface PresetPickerProps extends DateRangePickerProps {
  t?: UiStrings;
  /** date-fns locale for the calendar and the button label; English when omitted. */
  dateLocale?: DateFnsLocale;
}

export function DateRangePicker({
  className,
  dateRange,
  onDateRangeChange,
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DateRangePickerWithPresets({
  className,
  dateRange,
  onDateRangeChange,
  t = EN_UI,
  dateLocale,
}: PresetPickerProps) {
  const fmt = (d: Date) => format(d, dateLocale ? "PP" : "LLL dd, y", { locale: dateLocale });
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {fmt(dateRange.from)} -{" "}
                  {fmt(dateRange.to)}
                </>
              ) : (
                fmt(dateRange.from)
              )
            ) : (
              <span>{t.pickDateRange}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col sm:flex-row">
            <div className="border-r p-4 flex flex-col gap-2">
              <h3 className="font-medium text-sm">{t.quickSelect}</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    onDateRangeChange({
                      from: today,
                      to: today,
                    });
                  }}
                >
                  {t.today}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    const yesterday = addDays(today, -1);
                    onDateRangeChange({
                      from: yesterday,
                      to: yesterday,
                    });
                  }}
                >
                  {t.yesterday}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    onDateRangeChange({
                      from: addDays(today, -7),
                      to: today,
                    });
                  }}
                >
                  {t.last7}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    onDateRangeChange({
                      from: addDays(today, -30),
                      to: today,
                    });
                  }}
                >
                  {t.last30}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    const lastWeek = subWeeks(today, 1);
                    const lastWeekStart = startOfWeek(lastWeek, { weekStartsOn: 0 }); // 0 for Sunday, 1 for Monday
                    const lastWeekEnd = endOfWeek(lastWeek, { weekStartsOn: 0 });
                    onDateRangeChange({
                      from: lastWeekStart,
                      to: lastWeekEnd,
                    });
                  }}
                >
                  {t.presetLastWeek}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    const lastMonth = subMonths(today, 1);
                    const lastMonthStart = startOfMonth(lastMonth);
                    const lastMonthEnd = endOfMonth(lastMonth);
                    onDateRangeChange({
                      from: lastMonthStart,
                      to: lastMonthEnd,
                    });
                  }}
                >
                  {t.presetLastMonth}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    onDateRangeChange({
                      from: startOfYear(today),
                      to: today,
                    });
                  }}
                >
                  {t.thisYear}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    onDateRangeChange({
                      from: subMonths(today, 12),
                      to: today,
                    });
                  }}
                >
                  {t.past12}
                </Button>
              </div>
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              locale={dateLocale}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 