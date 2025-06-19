import { RestaurantSettingsContext } from "@/store/RestaurantSettings";
import { useContext } from "react";


export default function usePaymentMethods() {
    // payment methods  context
    const { paymentMethods, setPaymentMethods, handelUpdatePaymentMethods } = useContext(RestaurantSettingsContext);

    // Toggle payment method
    const togglePaymentMethod = (id) => {
        const updatedMethods = paymentMethods.map(method =>
            method.id === id ? { ...method, enabled: !method.enabled } : method
        );
        setPaymentMethods(updatedMethods);
        handelUpdatePaymentMethods(updatedMethods);
    };

    return [
        paymentMethods,
        togglePaymentMethod
    ];
}
