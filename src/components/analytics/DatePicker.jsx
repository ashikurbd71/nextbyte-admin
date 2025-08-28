import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";

const DatePicker = ({
    showDatePicker,
    setShowDatePicker,
    currentMonth,
    setCurrentMonth,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    onApply,
    onReset,
    title = "Select Date Range"
}) => {
    const datePickerRef = useRef(null);

    // Click outside handler to close date picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };

        if (showDatePicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDatePicker, setShowDatePicker]);

    // Date picker helper functions
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add all days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const isDateInRange = (date) => {
        if (!date) return false;
        return date >= selectedStartDate && date <= selectedEndDate;
    };

    const handleDateClick = (date) => {
        if (!date) return;

        // If no start date is selected, or if we're selecting a date before the current start date
        // or if both start and end dates are already selected, start a new selection
        if (!selectedStartDate || date < selectedStartDate || (selectedStartDate && selectedEndDate && selectedStartDate !== selectedEndDate)) {
            setSelectedStartDate(date);
            setSelectedEndDate(date);
        } else {
            // Otherwise, set the end date
            setSelectedEndDate(date);
        }
    };

    return (
        <div className="relative" ref={datePickerRef}>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDatePicker(!showDatePicker)}
            >
                <CalendarDays className="mr-2 h-4 w-4" />
                Date Range
            </Button>

            {/* Date Picker Popover */}
            {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 min-w-[320px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDatePicker(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-medium text-slate-900 dark:text-white">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 py-2">
                                {day}
                            </div>
                        ))}

                        {getDaysInMonth(currentMonth).map((date, index) => (
                            <button
                                key={index}
                                onClick={() => handleDateClick(date)}
                                disabled={!date}
                                className={`
                                    p-2 text-sm rounded-md transition-colors relative
                                    ${!date ? 'invisible' : ''}
                                    ${date && isDateInRange(date)
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                                    }
                                    ${date && date.toDateString() === selectedStartDate.toDateString()
                                        ? 'ring-2 ring-green-400 dark:ring-green-500 bg-green-500 text-white'
                                        : ''
                                    }
                                    ${date && date.toDateString() === selectedEndDate.toDateString()
                                        ? 'ring-2 ring-red-400 dark:ring-red-500 bg-red-500 text-white'
                                        : ''
                                    }
                                    ${date && isDateInRange(date) && date.toDateString() !== selectedStartDate.toDateString() && date.toDateString() !== selectedEndDate.toDateString()
                                        ? 'bg-blue-400 text-white'
                                        : ''
                                    }
                                `}
                            >
                                {date ? date.getDate() : ''}
                                {date && date.toDateString() === selectedStartDate.toDateString() && (
                                    <span className="absolute -top-1 -right-1 text-xs bg-green-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                                        S
                                    </span>
                                )}
                                {date && date.toDateString() === selectedEndDate.toDateString() && date.toDateString() !== selectedStartDate.toDateString() && (
                                    <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                                        E
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Selected Range Display */}
                    <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className="text-sm text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Selected Range:</span>
                        </div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {formatDate(selectedStartDate)} - {formatDate(selectedEndDate)}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onReset}
                        >
                            Reset
                        </Button>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDatePicker(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={onApply}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
