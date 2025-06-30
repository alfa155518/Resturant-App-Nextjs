
import { useState, useEffect, useRef, useCallback } from 'react';
import { enableTwoFactorAuth, verifyTwoFactorAuth } from '@/actions/auth';
import { toast } from 'react-toastify';

export default function useUserTwoFactorAuth() {

    // States
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [activeInput, setActiveInput] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showQrCode, setShowQrCode] = useState(true);
    const [qrCode, setQrCode] = useState('');
    const [isLoadingQrCode, setIsLoadingQrCode] = useState(false);
    const inputRefs = useRef([]);
    const containerRef = useRef(null);


    // Generate qr code
    useEffect(() => {
        const GenerateQrCode = async () => {
            setIsLoadingQrCode(true);
            const data = await enableTwoFactorAuth();
            setQrCode(data.qrCode);
            setIsLoadingQrCode(false);
        }
        GenerateQrCode();
    }, []);



    // Handle code input change
    const handleCodeChange = useCallback((index, value) => {
        if (value && !/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only take the last character
        setCode(newCode);

        // Move to next input or submit if last input
        if (value && index < 5) {
            setActiveInput(index + 1);
        } else if (index === 5 && value) {
            handleSubmit(newCode.join(''));
            setCode(['', '', '', '', '', '']);
            setShowQrCode(true);
        }
    }, [code]);

    // Handle backspace
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            setActiveInput(index - 1);
        }
    };


    // Handle form submission
    const handleSubmit = async (verificationCode) => {
        if (verificationCode.length !== 6) return;
        setIsLoading(true);
        const data = await verifyTwoFactorAuth(verificationCode);
        if (data.status === 'success') {
            toast.success(data.message);
            setCode(['', '', '', '', '', '']);
            setShowQrCode(true);
        }
        if (data.status === 'error') {
            toast.error(data.message);
        }
        setIsLoading(false);
    };



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

    // Animation variants
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

    // Animation variants
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


    return {
        code,
        activeInput,
        isLoading,
        showQrCode,
        qrCode,
        isLoadingQrCode,
        inputRefs,
        containerRef,
        containerVariants,
        itemVariants,
        buttonVariants,
        handleCodeChange,
        handleKeyDown,
        handleSubmit,
        setShowQrCode,
        setActiveInput
    }

}