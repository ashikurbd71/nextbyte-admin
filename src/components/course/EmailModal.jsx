import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

const EmailModal = ({
    isOpen,
    onClose,
    onSubmit,
    mailForm,
    setMailForm,
    isLoading,
    title,
    recipientInfo,
    isIndividual = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center space-x-2">
                        <Mail className="h-5 w-5" />
                        <span>{title}</span>
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8"
                    >
                        <span className="sr-only">Close</span>
                        ×
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Email Title *</Label>
                            <Input
                                id="title"
                                placeholder="Enter email title..."
                                value={mailForm.title}
                                onChange={(e) => setMailForm(prev => ({ ...prev, title: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Email Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter email description..."
                                value={mailForm.description}
                                onChange={(e) => setMailForm(prev => ({ ...prev, description: e.target.value }))}
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link">Link (Optional)</Label>
                            <Input
                                id="link"
                                placeholder="Enter link URL..."
                                value={mailForm.link}
                                onChange={(e) => setMailForm(prev => ({ ...prev, link: e.target.value }))}
                            />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                    <p className="font-medium">Email will be sent to:</p>
                                    <p className="mt-1">
                                        <strong>{recipientInfo}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!mailForm.title.trim() || !mailForm.description.trim() || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Send Email
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmailModal;
