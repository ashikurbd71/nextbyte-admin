import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FolderOpen, Loader2 } from "lucide-react";

const LessonTable = ({ data, headers, isLoading }) => {
    return (
        <div className="relative">
            <div className="overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="border-b border-gray-200 dark:border-gray-700 hover:bg-transparent">
                            {headers?.map((header, index) => (
                                <TableHead
                                    key={index}
                                    className={`${index + 1 === headers?.length ? "text-center" : "text-left"
                                        } text-sm font-medium text-gray-700 dark:text-gray-300 py-4 px-4 bg-gray-50 dark:bg-gray-800/50`}
                                >
                                    {header.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, rowIndex) => (
                                <TableRow key={rowIndex} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    {headers.map((_, colIndex) => (
                                        <TableCell key={colIndex} className="py-4 px-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                            : data?.map((item, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
                                >
                                    {headers.map((header, colIndex) => (
                                        <TableCell
                                            key={colIndex}
                                            className={`py-4 px-4 ${colIndex + 1 === headers?.length ? "text-center" : "text-left"
                                                }`}
                                        >
                                            {header.cell ? header.cell(item) : item[header.field]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10">
                    <div className="flex items-center space-x-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Loading lessons...</span>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && (!data || data.length === 0) && (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <FolderOpen className="h-8 w-8 text-gray-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        No lessons found
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                        {data === null ? "Unable to load lessons. Please try again." : "Get started by creating your first lesson."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LessonTable;
