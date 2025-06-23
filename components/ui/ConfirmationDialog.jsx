
import { toast } from 'react-toastify';
import styles from '../../src/css/ConfirmationDialog.module.css';

/**
 * Displays a confirmation dialog using toast
 * @param {Object} props - Component props
 * @param {string} props.message - The confirmation message to display
 * @param {Function} props.onConfirm - Function to call when confirmed
 * @param {string} [props.confirmText='Confirm'] - Text for the confirm button
 * @param {string} [props.cancelText='Cancel'] - Text for the cancel button
 * @param {string} [props.confirmButtonStyle] - Inline styles for confirm button
 * @param {string} [props.cancelButtonStyle] - Inline styles for cancel button
 * @param {Object} [props.toastOptions] - Additional toast options
 * @returns {void}
 */
const ConfirmationDialog = ({
    message,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonStyle = {
        background: '#ff4444',
        color: 'white',
    },
    cancelButtonStyle = {
        background: '#6c757d',
        color: 'white',
    },
    toastOptions = {},
}) => {
    const show = () => {
        toast.warning(
            <div className={styles.confirmationContent}>
                <p>{message}</p>
                <div className={styles.buttonContainer}>
                    <button
                        onClick={() => {
                            toast.dismiss();
                            onConfirm();
                        }}
                        style={{
                            ...confirmButtonStyle,
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1,
                        }}
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        style={{
                            ...cancelButtonStyle,
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1,
                            marginLeft: '10px',
                        }}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>,
            {
                autoClose: false,
                closeButton: false,
                closeOnClick: false,
                draggable: false,
                style: { width: '100%' },
                ...toastOptions,
            }
        );
    };

    return { show };
};

export default ConfirmationDialog;
