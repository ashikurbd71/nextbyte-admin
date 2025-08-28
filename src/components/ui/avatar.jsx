import React from "react";
import { cn } from "@/lib/utils.js";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            className
        )}
        {...props}
    />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, src, alt = "", ...props }, ref) => {
    if (!src) {
        return null;
    }

    return (
        <img
            ref={ref}
            src={src}
            alt={alt}
            className={cn("aspect-square h-full w-full object-cover", className)}
            {...props}
        />
    );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => {
    // If children is provided, use it, otherwise create initials from alt text
    const fallbackContent = children || (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {props.alt ? props.alt.charAt(0).toUpperCase() : "U"}
        </div>
    );

    return (
        <div
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-muted",
                className
            )}
            {...props}
        >
            {fallbackContent}
        </div>
    );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
