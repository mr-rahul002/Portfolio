import { cn } from "@/lib/utils";

interface ResumeButtonProps {
    className?: string;
}

const ResumeButton = ({ className }: ResumeButtonProps) => {
    const handleResumeDownload = () => {
        try {
            // Use Vite's import.meta.env.BASE_URL to handle the base path correctly
            // This works for both local dev ('/') and GitHub Pages ('/Portfolio/')
            const resumeUrl = `${import.meta.env.BASE_URL}Resume.pdf`.replace('//', '/');
            
            // Method 1: Try using fetch to get the file and create blob
            fetch(resumeUrl)
                .then(response => response.blob())
                .then(blob => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Rahul_Seth_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => {
                    console.error('Download failed:', error);
                    // Fallback: direct link approach
                    const link = document.createElement('a');
                    link.href = resumeUrl;
                    link.download = 'Rahul_Seth_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
        } catch (error) {
            console.error('Resume download error:', error);
            // Final fallback: open in new tab
            window.open(`${import.meta.env.BASE_URL}Resume.pdf`.replace('//', '/'), '_blank');
        }
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