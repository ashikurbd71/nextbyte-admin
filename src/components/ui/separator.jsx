import React from "react";

const Separator = React.forwardRef(({ className = "", orientation = "horizontal", ...props }, ref) => {
    const baseClasses = "shrink-0 bg-slate-200 dark:bg-slate-700";
    const orientationClasses = orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]";
    const combinedClasses = `${baseClasses} ${orientationClasses} ${className}`.trim();

    return (
        <div
            ref={ref}
            className={combinedClasses}
            role="separator"
            {...props}
        />
    );
});

Separator.displayName = "Separator";

export { Separator };
