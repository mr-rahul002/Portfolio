import { cn } from "@/lib/utils";

interface ResumeButtonProps {
    className?: string;
}

const ResumeButton = ({ className }: ResumeButtonProps) => {
    const handleResumeDownload = () => {
        // For GitHub Pages deployment
        const resumeUrl = process.env.NODE_ENV === 'production'
            ? '/Portfolio/Resume.pdf'
            : '/Resume.pdf';

        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Rahul_Seth_Resume.pdf'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleResumeDownload}
            className={cn(
                "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium text-white bg-black hover:bg-black/90 transition-all duration-300",
                className
            )}
        >
            Download Resume
        </button>
    );
};

export default ResumeButton;