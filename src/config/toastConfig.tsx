import React from "react";
import { BaseToast, BaseToastProps, ErrorToast, ToastConfig } from "react-native-toast-message";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ms } from "react-native-size-matters";

export const toastConfig: ToastConfig = {

    //Success Toast
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            text2NumberOfLines={3}
            style = {{
                borderLeftColor: '#69C779',
                borderLeftWidth: wp(1),
                width: wp(90),
                minHeight: hp(6.5),
                paddingVertical: hp(1),
                backgroundColor: '#f8f8f8',
            }}
            contentContainerStyle = {{ paddingHorizontal: 15 }}
            text1Style = {{
                fontSize: ms(14),
                fontWeight: 'bold',
                color: '#2E8B57',
            }}
            text2Style = {{
                fontSize: ms(12),
                color: '#555555',
            }}
        />
    ),
    
    // Error Toast
    error: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            text2NumberOfLines={3}
            style = {{
                borderLeftColor: '#D22B2B',
                borderLeftWidth: wp(1),
                width: wp(90),
                minHeight: hp(6.5),
                paddingVertical: hp(1),
                backgroundColor: '#f8f8f8',
            }}
            contentContainerStyle = {{ paddingHorizontal: 15}}
            text1Style = {{
                fontSize: ms(14),
                fontWeight: 'bold',
                color: '#A42A2A',
            }}
            text2Style = {{
                fontSize: ms(12),
                color: '#555555',
            }}
        />
    ),

    // Info Toast
    info: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            text2NumberOfLines={3}
            style = {{
                borderLeftColor: '#1E90FF',
                borderLeftWidth: wp(1),
                width: wp(90),
                minHeight: hp(6.5),
                paddingVertical: hp(1),
                backgroundColor: '#f8f8f8',
            }}
            contentContainerStyle = {{ paddingHorizontal: 15 }}
            text1Style = {{
                fontSize: ms(14),
                fontWeight: 'bold',
                color: '#104E8B',
            }}
            text2Style = {{
                fontSize: ms(12),
                color: '#555555',
            }}
        />
    ),
};