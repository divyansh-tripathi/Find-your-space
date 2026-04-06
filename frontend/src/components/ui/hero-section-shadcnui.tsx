import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '1.5rem',
                padding: '7rem 4rem',
                textAlign: 'center',
                marginBottom: '0',
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
            }}
        >
            {/* Glow blobs */}
            <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'rgba(99, 102, 241, 0.2)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'rgba(168, 85, 247, 0.2)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }} />

            {/* Badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
                <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc',
                    border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '2rem',
                    padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.05rem',
                }}>
                    <Sparkles size={14} />
                    Find Your Perfect Space
                </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} style={{ fontSize: '5rem', lineHeight: '1.05', fontWeight: 900, marginBottom: '1.5rem', color: 'white' }}>
                Adventure Awaits
                <br />
                <span style={{
                    background: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #c084fc 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Around Every Corner.
                </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} style={{
                fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '650px',
                margin: '0 auto 3.5rem', lineHeight: '1.7',
            }}>
                Discover thousands of premium rooms, creative studios, and unique stays curated for the modern traveler. Experience comfort like never before.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                    to="/login"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: 'white', border: 'none', padding: '1rem 2.5rem',
                        borderRadius: '1rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
                        boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.5)',
                        textDecoration: 'none', transition: 'all 0.3s ease',
                    }}
                    onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                    onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                    Explore Spaces <ArrowRight size={18} />
                </Link>
                <Link
                    to="/signup"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(255,255,255,0.05)', color: 'white',
                        border: '1px solid rgba(255,255,255,0.15)', padding: '1rem 2.5rem',
                        borderRadius: '1rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
                        textDecoration: 'none', transition: 'all 0.3s ease',
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                >
                    Join Community
                </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={itemVariants} style={{
                marginTop: '4rem', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '3rem', flexWrap: 'wrap',
                color: 'var(--text-muted)', fontSize: '0.9rem',
            }}>
                {[
                    { value: '10k+', label: 'Happy Guests' },
                    { value: '500+', label: 'Premium Spaces' },
                    { value: '50+', label: 'Cities' },
                ].map((stat, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>{stat.value}</span>
                        <span style={{ marginTop: '0.2rem' }}>{stat.label}</span>
                        {i < 2 && <div style={{ display: 'none' }} />}
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}
