import { createContext, useContext, type PropsWithChildren } from "react";

type UseProviderHook<TProps, TReturn> = (props: TProps) => TReturn;

export function contextFactory<TProps, TReturn>(
    useProviderHook?: UseProviderHook<TProps, TReturn>,
    errorMessage = "Context not used in appropriate Provider"
) {
    const Context = createContext<TReturn | undefined>(undefined);

    const useContextHook = () => {
        const context = useContext(Context);

        if (!context) throw new Error(errorMessage);

        return context;
    };

    const Provider = ({ children, ...rest }: PropsWithChildren<TProps>) => {
        const value = useProviderHook ? useProviderHook(rest as TProps) : (rest as TReturn);

        return <Context.Provider value={value}>{children}</Context.Provider>;
    };

    return [Provider, useContextHook] as const;
}
