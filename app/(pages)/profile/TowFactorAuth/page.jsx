"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiArrowLeft,
    FiRotateCw,
    FiCheckCircle,
    FiAlertCircle,
    FiCopy,
    FiCheck,
    FiEye,
    FiEyeOff
} from 'react-icons/fi';
import Image from 'next/image';
import styles from '../../../../src/css/profile-two-fa.module.css';
import { useRouter } from 'next/navigation';

// Generate a random secret key for 2FA (in a real app, this would come from your backend)
const generateRandomSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
        secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
};

const TwoFactorAuthPage = () => {
    const router = useRouter();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [activeInput, setActiveInput] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countdown, setCountdown] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [showQrCode, setShowQrCode] = useState(true);
    const [secretKey, setSecretKey] = useState('');
    const [copied, setCopied] = useState(false);
    const [showSecret, setShowSecret] = useState(false);
    const inputRefs = useRef([]);
    const containerRef = useRef(null);
    const secretKeyRef = useRef('');

    // Initialize or get the secret key
    useEffect(() => {
        // In a real app, you would fetch this from your backend
        const savedSecret = localStorage.getItem('2fa_secret');
        if (savedSecret) {
            setSecretKey(savedSecret);
            secretKeyRef.current = savedSecret;
        } else {
            const newSecret = generateRandomSecret();
            setSecretKey(newSecret);
            secretKeyRef.current = newSecret;
            localStorage.setItem('2fa_secret', newSecret);
        }
    }, []);

    // Generate QR code URL for authenticator apps
    const getQrCodeUrl = useCallback(() => {
        const appName = 'Restaurant App';
        const email = 'user@example.com'; // Replace with actual user email
        const secret = secretKeyRef.current;
        return `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/${encodeURIComponent(appName)}:${encodeURIComponent(email)}?secret=${secret}&issuer=${encodeURIComponent(appName)}`;
    }, []);

    // Copy secret key to clipboard
    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(secretKeyRef.current);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    // Generate random background circles
    const [circles] = useState(() => {
        return Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            size: Math.random() * 300 + 100,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * -20
        }));
    });

    // Countdown timer for resend button
    useEffect(() => {
        let timer;
        if (countdown > 0 && !canResend) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [countdown, canResend]);

    // Handle code input change
    const handleCodeChange = (index, value) => {
        if (value && !/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only take the last character
        setCode(newCode);
        setError('');
        setSuccess('');

        // Move to next input or submit if last input
        if (value && index < 5) {
            setActiveInput(index + 1);
        } else if (index === 5 && value) {
            handleSubmit(newCode.join(''));
        }
    };

    // Handle backspace
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            setActiveInput(index - 1);
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();

        if (/^\d{6}$/.test(pastedData)) {
            const pastedCode = pastedData.split('');
            setCode(pastedCode);
            handleSubmit(pastedData);
        }
    };

    // Handle form submission
    const handleSubmit = async (verificationCode) => {
        if (verificationCode.length !== 6) return;

        setIsLoading(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock success response
            const isSuccess = Math.random() > 0.5;

            if (isSuccess) {
                setSuccess('Verification successful! Redirecting...');
                setTimeout(() => {
                    router.push('/profile');
                }, 1500);
            } else {
                setError('Invalid verification code. Please try again.');
                setCode(['', '', '', '', '', '']);
                setActiveInput(0);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resend code
    const handleResendCode = useCallback(() => {
        if (!canResend) return;

        setCountdown(30);
        setCanResend(false);
        setCode(['', '', '', '', '', '']);
        setActiveInput(0);
        setError('');
        setSuccess('A new verification code has been sent to your email.');

        // Simulate sending a new code
        setTimeout(() => {
            setSuccess('');
        }, 5000);
    }, [canResend]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.02,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10
            }
        },
        tap: { scale: 0.98 }
    };

    return (
        <div className={styles.container}>
            {/* Animated background */}
            <div className={styles.background}>
                {circles.map((circle) => (
                    <motion.div
                        key={circle.id}
                        className={styles.circle}
                        style={{
                            width: circle.size,
                            height: circle.size,
                            left: `${circle.x}%`,
                            top: `${circle.y}%`,
                        }}
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: circle.duration,
                            delay: circle.delay,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                ref={containerRef}
            >
                <motion.div
                    className={styles.header}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 className={styles.title} variants={itemVariants}>
                        Two-Factor Authentication
                    </motion.h1>
                    <motion.p className={styles.subtitle} variants={itemVariants}>
                        {showQrCode
                            ? 'Scan the QR code with your authenticator app'
                            : 'Enter the 6-digit code from your authenticator app'}
                    </motion.p>
                </motion.div>

                {showQrCode ? (
                    <motion.div
                        className={styles.qrSection}
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.qrCodeContainer}>
                            <Image
                                src={getQrCodeUrl()}
                                alt="2FA QR Code"
                                width={200}
                                height={200}
                                className={styles.qrCode}
                                unoptimized // For external URLs
                            />
                        </div>

                        {/* <div className={styles.secretKeyContainer}>
                            <div className={styles.secretKeyLabel}>Or enter this code manually:</div>
                            <div className={styles.secretKeyWrapper}>
                                <div className={styles.secretKey}>
                                    {showSecret ? (
                                        secretKey.match(/.{1,4}/g)?.join(' ') || secretKey
                                    ) : (
                                        '• • • •   • • • •   • • • •   • • • •   • • • •   • • • •   • • • •   • • • •'
                                    )}
                                </div>
                                <div className={styles.secretKeyActions}>
                                    <button
                                        type="button"
                                        className={styles.iconButton}
                                        onClick={() => setShowSecret(!showSecret)}
                                        aria-label={showSecret ? 'Hide secret key' : 'Show secret key'}
                                    >
                                        {showSecret ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.iconButton}
                                        onClick={copyToClipboard}
                                        aria-label="Copy to clipboard"
                                    >
                                        {copied ? <FiCheck /> : <FiCopy />}
                                    </button>
                                </div>
                            </div>
                            {copied && <div className={styles.copySuccess}>Copied to clipboard!</div>}
                        </div> */}

                        <div className={styles.switchMethod}>
                            Already set up your authenticator?{' '}
                            <button
                                type="button"
                                className={styles.textButton}
                                onClick={() => setShowQrCode(false)}
                            >
                                Enter code manually
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    // <div className={styles.switchMethod}>
                    //     Need to set up an authenticator?{' '}
                    //     <button 
                    //         type="button" 
                    //         className={styles.textButton}
                    //         onClick={() => setShowQrCode(true)}
                    //     >
                    //         Scan QR code
                    //     </button>
                    // </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <motion.div
                            className={styles.formGroup}
                            variants={itemVariants}
                        >
                            <div className={styles.codeContainer}>
                                {code.map((digit, index) => (
                                    <motion.input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength={1}
                                        className={styles.codeInput}
                                        value={digit}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        onFocus={() => setActiveInput(index)}
                                        autoFocus={index === 0 && activeInput === 0}
                                        disabled={isLoading}
                                        variants={itemVariants}
                                        whileFocus={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    className={styles.error}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiAlertCircle style={{ marginRight: '8px' }} />
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    className={styles.success}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiCheckCircle style={{ marginRight: '8px' }} />
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div variants={itemVariants}>
                            <motion.button
                                type="button"
                                className={styles.button}
                                onClick={() => handleSubmit(code.join(''))}
                                disabled={isLoading || code.some(digit => !digit) || !!success}
                                variants={buttonVariants}
                                whileHover={!isLoading && !success ? "hover" : ""}
                                whileTap={!isLoading && !success ? "tap" : ""}
                            >
                                {isLoading ? (
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        style={{ display: 'inline-flex', alignItems: 'center' }}
                                    >
                                        <FiRotateCw style={{ marginRight: '8px' }} />
                                        Verifying...
                                    </motion.span>
                                ) : success ? (
                                    'Verified!'
                                ) : (
                                    'Verify Code'
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                )}

                <motion.div
                    className={styles.resendContainer}
                    variants={itemVariants}
                >
                    Didn't receive a code?{' '}
                    <button
                        type="button"
                        className={styles.resendButton}
                        onClick={handleResendCode}
                        disabled={!canResend}
                    >
                        {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default TwoFactorAuthPage;