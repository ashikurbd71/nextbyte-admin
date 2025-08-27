import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "./Loader";

const LoaderDemo = () => {
    const [showFullScreen, setShowFullScreen] = useState(false);

    const variants = [
        { name: "Spinner", variant: "spinner" },
        { name: "Dots", variant: "dots" },
        { name: "Pulse", variant: "pulse" },
        { name: "Ring", variant: "ring" },
        { name: "Bars", variant: "bars" },
        { name: "Atom", variant: "atom" }
    ];

    const sizes = ["xs", "sm", "md", "lg", "xl"];

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Loader Components
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Different loader variants and usage examples
                </p>
            </div>

            {/* Full Screen Loader Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Full Screen Loader</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => setShowFullScreen(true)}>
                        Show Full Screen Loader
                    </Button>
                    {showFullScreen && (
                        <Loader
                            variant="dots"
                            size="lg"
                            text="Loading your data..."
                            fullScreen={true}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Variants Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Loader Variants</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {variants.map((variant) => (
                            <div key={variant.variant} className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                                <Loader variant={variant.variant} size="md" />
                                <span className="text-sm font-medium">{variant.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Sizes Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Loader Sizes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-8">
                        {sizes.map((size) => (
                            <div key={size} className="flex flex-col items-center space-y-2">
                                <Loader variant="spinner" size={size} />
                                <span className="text-sm font-medium capitalize">{size}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Usage Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Button Loading State</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full">
                            <Loader variant="dots" size="sm" className="text-white mr-2" />
                            Loading...
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Loader variant="ring" size="sm" className="mr-2" />
                            Processing...
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Content Loading State</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                            <Loader variant="pulse" size="lg" text="Loading content..." />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Code Examples */}
            <Card>
                <CardHeader>
                    <CardTitle>Usage Examples</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">Basic Usage:</h4>
                            <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
                                {`<Loader variant="spinner" size="md" />`}
                            </pre>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">With Text:</h4>
                            <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
                                {`<Loader variant="dots" size="lg" text="Loading data..." />`}
                            </pre>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Full Screen:</h4>
                            <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
                                {`<Loader 
  variant="ring" 
  size="xl" 
  text="Please wait..." 
  fullScreen={true} 
/>`}
                            </pre>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">In Button:</h4>
                            <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
                                {`<Button>
  <Loader variant="dots" size="sm" className="text-white mr-2" />
  Loading...
</Button>`}
                            </pre>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoaderDemo;
