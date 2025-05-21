import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const paymentSuccessReservation = async (
    sessionId,
    reservationId,
    verifyPaymentSession,
    router,
    setIsLoading,
    setPaymentDetailsReservation,
    setPaymentDetailsArray
) => {

    if (!sessionId) {
        setIsLoading(false);
        return false;
    }

    setIsLoading(true);

    try {
        // Load existing payments from cookies
        const storedPayments = Cookies.get('paymentReservationDetailsArray');
        const paymentArray = storedPayments ? JSON.parse(storedPayments) : [];

        // Check if this payment was already processed
        const paymentExists = paymentArray.some(
            (payment) => payment.session_id === sessionId
        );

        if (paymentExists) {
            // If payment exists, show info toast and load from cookies
            toast.info('This payment was already processed.');
            const storedDetails = Cookies.get('paymentReservationDetails');

            if (storedDetails) {
                setPaymentDetailsReservation(JSON.parse(storedDetails));
            }

            setIsLoading(false);
            return false;
        }

        // Verify new payment
        const data = await verifyPaymentSession(sessionId, reservationId);
        console.log('Payment verification response:', data);

        if (data.status === 'error') {
            toast.error(data.message);
            router.push('/profile');
            return false;
        }

        // Save new payment to array
        const newPaymentData = { ...data.data, session_id: sessionId };
        const updatedPayments = [...paymentArray, newPaymentData];
        setPaymentDetailsArray(updatedPayments);

        // Save to cookies
        Cookies.set('paymentReservationDetailsArray', JSON.stringify(updatedPayments), {
            expires: 7,
        });
        Cookies.set('paymentReservationDetails', JSON.stringify(data.data), {
            expires: 7,
        });

        // Update state and show success toast
        setPaymentDetailsReservation(data.data);
        toast.success('Payment verified successfully! Thank you.', {
            icon: '\ud83c\udf89',
        });

        // Remove query parameters
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);

        return true;
    } catch (err) {
        console.error('Verify payment error:', err);
        toast.error('Failed to verify payment.');
        router.push('/profile');
        return false;
    } finally {
        setIsLoading(false);
    }
};
