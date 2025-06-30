"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../../../../src/css/profile-two-fa.module.css';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useUserTwoFactorAuth from '@/hooks/useUserTwoFactorAuth';

const TwoFactorAuthPage = () => {
    // Two Factor Auth Custom Hook
    const {
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
        setActiveInput } = useUserTwoFactorAuth();

    return (
        <div className={styles.container}>
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
                        {isLoadingQrCode ? (
                            <div className='flex justify-center items-center h-[50px]'>
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <div className={styles.qrCodeContainer}>
                                <Image
                                    src={`data:image/svg+xml;base64,${qrCode}`}
                                    alt="2FA QR Code"
                                    width={200}
                                    height={200}
                                    className={styles.qrCode}
                                    unoptimized
                                />
                            </div>

                        )}
                        {
                            isLoadingQrCode ? (
                                <></>
                            ) : (
                                < div className={styles.switchMethod}>
                                    Already set up your authenticator?{' '}
                                    <button
                                        type="button"
                                        className={styles.textButton}
                                        onClick={() => setShowQrCode(false)}
                                    >
                                        Enter code
                                    </button>
                                </div>
                            )}
                    </motion.div>
                ) : (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <motion.div
                            className={styles.formGroup}
                            variants={itemVariants}
                        >
                            <div className={styles.codeContainer}>
                                {code.map((digit, index) => (
                                    <motion.input
                                        key={index}
                                        name='code'
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength={1}
                                        className={styles.codeInput}
                                        value={digit}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
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
                        <motion.div variants={itemVariants}>
                            <motion.button
                                type="button"
                                className={styles.button}
                                onClick={() => handleSubmit(code.join(''))}
                                variants={buttonVariants}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    "Verifying..."
                                ) : (
                                    "Verify Code"
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                )}
            </motion.div>
        </div >
    );
};
export default TwoFactorAuthPage;