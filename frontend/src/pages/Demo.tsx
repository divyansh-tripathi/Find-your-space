import { HeroSection } from "@/components/ui/hero-section-shadcnui"
import ConfettiBackground from "@/components/ui/confetti-background"

export default function Demo() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-8 relative overflow-hidden">
            <ConfettiBackground />
            <HeroSection />
        </div>
    )
}
